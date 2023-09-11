from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import cv2 as cv

import pandas as pd 
import glob
import cv2 as cv
import random
import os
import numpy as np
import random
from torch.utils.data import DataLoader, Dataset
import torch
import torch.nn as nn
import torch.nn.functional as F
import albumentations as A
from albumentations.pytorch.transforms import ToTensorV2
from tqdm.auto import tqdm
import timm
import numpy as np
import mediapipe as mp
from mediapipe.tasks import python
from mediapipe.tasks.python import vision
import numpy as np
import mediapipe as mp
from mediapipe.tasks import python
from mediapipe.tasks.python import vision
from tqdm.notebook import tqdm
import pandas as pd
import torch
import torch.nn as nn
import random
import os
from sklearn.model_selection import train_test_split
from torch.utils.data import DataLoader, Dataset
import torch.nn.functional as F
import mask_image


review_img = cv.imread('1.png')
product_img = cv.imread('2.png')

def pred_distance(review_img_path, product_img_path):
    df = pd.DataFrame(columns=['review_img_path','product_img_path', 'label'])
    df['review_img_path'] = [review_img_path]
    df['product_img_path'] = [product_img_path]
    df['label'] = [0]
    
    device = torch.device('cuda') if torch.cuda.is_available() else torch.device('cpu')
    
    CFG = {
        'IMG_SIZE':224,
        'EPOCHS':1,
        'LEARNING_RATE':3e-4,
        # 'LEARNING_RATE':10,
        'BATCH_SIZE':1,
        'SEED':41
    }
    
    class SiameseNetworkDataset(Dataset):
        def __init__(self,review_img_path,product_img_path,label,transform=None):
            self.review_img_path = review_img_path
            self.product_img_path = product_img_path
            self.label = label
            self.transform = transform

        def __getitem__(self,index):
            # review_img = cv.imread(self.review_img_path[index])
            # product_img = cv.imread(self.product_img_path[index])
            review_img = self.review_img_path[index]
            product_img = self.product_img_path[index]
            review_img = cv.resize(review_img, (CFG['IMG_SIZE'], CFG['IMG_SIZE']))
            product_img = cv.resize(product_img, (CFG['IMG_SIZE'], CFG['IMG_SIZE']))

            if self.transform is not None:
                review_img  = self.transform(image=review_img)['image']
                product_img  = self.transform(image=product_img)['image']

            return review_img, product_img, self.label[index]

        def __len__(self):
            return len(self.review_img_path)
        
    train_transform = A.Compose([
                            A.Resize(CFG['IMG_SIZE'],CFG['IMG_SIZE']),
                            ToTensorV2()
                            ])
    
    val_dataset = SiameseNetworkDataset(df["review_img_path"].values, df["product_img_path"].values, df["label"].values, train_transform)
    val_loader = DataLoader(val_dataset, batch_size = CFG['BATCH_SIZE'], shuffle=False, num_workers=0)

    class BaseModel(nn.Module):
        def __init__(self):
            super(BaseModel, self).__init__()
            self.backbone = timm.create_model('efficientnet_b0', pretrained=False)
            self.classifier = nn.Linear(1000, 50)
            self.dropout = nn.Dropout(0.1)
            self.ReLU = nn.ReLU(inplace=False)

        def forward(self, x, y):
            x = self.backbone(x)
            x = self.classifier(x)

            y = self.backbone(y)
            y = self.classifier(y)

            z = F.pairwise_distance(x, y, keepdim = True)
            return z
        
    def validation(model, val_loader, device):
        model.eval()
        pred_list = []
        
        with torch.no_grad():
            for review_img, product_img, labels in iter(val_loader):
                review_img = review_img.float().to(device)
                product_img = product_img.float().to(device)
    
                
                pred = model(review_img, product_img)
                pred = pred.detach().cpu().numpy().tolist()
                pred_list += pred
            
        return pred_list 
        
    def train(model,  val_loader,  device):
        model = model.to(device)

        model.train()
        prediction = validation(model, val_loader, device)

        return prediction
        
    
    model = BaseModel()
    model.load_state_dict(torch.load('./distance_EffNetBase_E_Contra.pt'))
    model.eval()

    prediction = train(model,  val_loader, device)
    
    return prediction[0][0]



base_options = python.BaseOptions(model_asset_path='pose_landmarker.task')
options = vision.PoseLandmarkerOptions(
        base_options=base_options,
        num_poses = 22,
        output_segmentation_masks=False)

detector = vision.PoseLandmarker.create_from_options(options)

def Pose_Estimation(img_path):
    device = torch.device('cuda') if torch.cuda.is_available() else torch.device('cpu')
    CFG = {
        'EPOCHS':1,
        'LEARNING_RATE':3e-8,
        # 'LEARNING_RATE':10,
        'BATCH_SIZE':1,
        'SEED':41
        }
    
    save_x = []
    save_y = []
    save_z = []
    save_presence = []
    
        
    img = mp.Image.create_from_file(img_path)
    pose_landmarks_list = detector.detect(img).pose_landmarks
        
    if not pose_landmarks_list:
        return False
            
    save_x.append([i.x for i in pose_landmarks_list[0][11:33]])
    save_y.append([i.y for i in pose_landmarks_list[0][11:33]])
    save_z.append([i.z for i in pose_landmarks_list[0][11:33]])
    save_presence.append([i.presence for i in pose_landmarks_list[0][11:33]])
    
    df = pd.DataFrame(columns=['img_path','label'])
    
    df['img_path'] = None
    df['label'] = 0
    df['landmark_x'] = save_x
    df['landmark_y'] = save_y
    df['landmark_z'] = save_z
    df['landmark_presence'] = save_presence
    
    class CustomDataset(Dataset):
        def __init__(self, img_path ,landmark_x, landmark_y,	landmark_z,	landmark_presence, label):
            self.img_path = img_path
            self.landmark_x = landmark_x
            self.landmark_y = landmark_y
            self.landmark_z= landmark_z
            self.landmark_presence = landmark_presence
            self.label = label

        def __getitem__(self,index):

            result = np.concatenate((self.landmark_x[index] , self.landmark_y[index] , self.landmark_z[index] , self.landmark_presence[index]), axis=0)
            return result, self.label[index]

        def __len__(self):
            return len(self.landmark_x )
    
    val_dataset = CustomDataset(df["img_path"].values, df["landmark_x"].values, df["landmark_y"].values, df["landmark_z"].values,df["landmark_presence"].values, df["label"].values)
    val_loader = DataLoader(val_dataset, batch_size = CFG['BATCH_SIZE'], shuffle=False, num_workers=0)
    
    class BaseModel(nn.Module):
        def __init__(self):
            super(BaseModel, self).__init__()
            self.classifier1 = nn.Linear(88, 20)
            # self.classifier1 = nn.Linear(22, 2)
            self.ReLU = nn.ReLU(inplace=True)
            self.classifier2 = nn.Linear(20, 2)


        def forward(self, x):
            x = self.classifier1(x)
            x = self.ReLU(x)
            x = self.classifier2(x)

            return F.log_softmax(x, dim=1)
        
    def validation(model, criterion, val_loader, device):
        model.eval()
        preds= []
        with torch.no_grad():
            for landmark_list, labels in iter(val_loader):
                landmark_list = landmark_list.float().to(device)
                pred = model(landmark_list)
                preds += pred.detach().argmax(1).cpu().numpy().tolist()
        return preds


    def train(model, optimizer, train_loader, val_loader, scheduler, device):
        model = model.to(device)
        criterion = nn.NLLLoss(weight=torch.tensor([0.01, 0.99]), reduction="sum").to(device)
        best_model = None
        for epoch in range(0, CFG['EPOCHS']):
            model.train()
            label = validation(model, criterion, val_loader, device)
        return best_model , label
    
    model = BaseModel()
    model.load_state_dict(torch.load('./Pose_Estimate_new.pt'))
    model.eval()
    
    optimizer = torch.optim.Adam(params = model.parameters(), lr = CFG["LEARNING_RATE"])
    scheduler = torch.optim.lr_scheduler.ReduceLROnPlateau(optimizer, mode='max', factor=0.5, patience=2, threshold_mode='abs', min_lr=1e-8, verbose=True)
    infer_model, label = train(model, optimizer, None, val_loader, scheduler, device)
    
    if label[0] == 0:
        return True
    else:
        return False


def image_classifier(review_img, product_img):
    width = 30
    height = 50
    
    if Pose_Estimation(review_img):
        review_img = cv.imread(review_img)
        product_img = cv.imread(product_img)
        
        img_list  = mask_image.mask_image([review_img, product_img])
        preprocessed_review = img_list[0]
        preprocessed_product = img_list[1] 
        
        if (preprocessed_review is None) or (preprocessed_product is None):
            return str("이미지를 분류하는데 실패하였습니다"), False
        
        distance = pred_distance(preprocessed_review, preprocessed_product)
        
        if distance > 0.56:
            return str("구매하신 제품이 아닙니다.\n(distance :" + str(distance) + ")"), False
        else:
            return str("적립금이 지급되었습니다.\n(distance :" + str(distance) + ")"), True
    else:
        return str("전신사진을 넣어주세요."), False
print("ready")
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

received_modal_data = {}

@app.post("/")
async def receive_modal_data(modal_data: dict):
    global received_modal_data
    received_modal_data = modal_data
    # print( received_modal_data['userImgFilename'])
    # print( type(received_modal_data['userImgFilename']))
    img_path1 = "./" + received_modal_data['userImgFilename']
    img_path2 = "./" + received_modal_data['ImgFilename']
   
    print(img_path1, img_path2)
    
    if ( "./16.jpg" == img_path1):
        print("YES!")
    
    received_modal_data['whyRejected'], received_modal_data['isPhotoReviewed'] = image_classifier(img_path1,img_path2)
    print("predict end")
    return {"message": "Data received successfully"}

@app.get('/photoReview')
async def get_photo_review():
    global received_modal_data
    
    return received_modal_data

# uvicorn main:app --reload

# uvicorn main:app --reload
