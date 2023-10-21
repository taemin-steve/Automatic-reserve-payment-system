# 포토리뷰 적립금 자동지급 시스템 
많은 의류 사이트에서 포토리뷰 제도를 활용하여 잠재 구매자들에게 더 정확한 정보를 제공하고, 구매자들에게 적립금을 제공하고 있음. 하지만 이러한 적립금 지급은 시간과 인력이 많이 필요로 함.  

이에 AI 기술을 도입한 포토리뷰 적립금 자동화 시스템을 설계하여 필요 인력과 시간 절감 효과를 기대
<br>
<br>

# Demo
![KakaoTalk_20230911_192300394 (2)](https://github.com/taemin-steve/Automatic-reserve-payment-system/assets/75752289/aecf3a8f-4320-4414-bb98-1e80fdb3e99c)
<br>
<br>

# Overview
![image](https://github.com/taemin-steve/taemin-steve/assets/75752289/e56c6c72-288b-4a8c-bd05-b5c2f3f2a632)
<br>
<br>

# Condition 1 : 목부터 발끝까지 이미지 안에 나오는가?
MediaPipe를 활용하여 각각의 필수적인 관절이 사진 안에 포함되어 있는지 확인  
MediaPipe를 돌려 Joint 라고 판별한 pixel 좌표와, 해당 좌표의 precision을 Feature로 하여 2개의 Hidden Layer를 가지는 MLP 구성하여 정확도 0.94 달성
![image](https://github.com/taemin-steve/taemin-steve/assets/75752289/b77bc19d-dd67-431b-ac25-41b0069e9a22)
<br>
<br>

# Preporcessing 
두 번째 조건을 확인하기에 앞서, 체크하고자 하는것은 '옷'에 대한 것이므로, 옷을 제외한 나머지 픽셀을 제거.
Meta의 Segment Anything 모델에 앞서 Mediapipe로 얻은 joint 정보를 제공하여 원하는 옷 부위만을 남기고 나머지 픽셀 제거 

![image](https://github.com/taemin-steve/Automatic-reserve-payment-system/assets/75752289/27bb9882-0a97-4a2e-b95d-b41c98defdc4)
<br>
<br>

# Condition 2 : 포토 리뷰안에 들어 있는 제품이 구매한 제품과 동일 제품인가?
전처리한 이미지를 input으로 실제 제품과, 리뷰이미지에 존재하는 제품간의 유사도를 Siamese Network를 활용하여 계산, 정확도 0.72 달성 

# 결과
