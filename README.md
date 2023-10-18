# 포토리뷰 적립금 자동지급 시스템 
많은 의류 사이트에서 포토리뷰 제도를 활용하여 잠재 구매자들에게 더 정확한 정보를 제공하고, 구매자들에게 적립금을 제공하고 있음. 하지만 이러한 적립금 지급은 시간과 인력이 많이 필요로 함.  

이에 AI 기술을 도입한 포토리뷰 적립금 자동화 시스템을 설계하여 필요 인력과 시간 절감 효과를 기대

# Demo
![KakaoTalk_20230911_192300394 (2)](https://github.com/taemin-steve/Automatic-reserve-payment-system/assets/75752289/aecf3a8f-4320-4414-bb98-1e80fdb3e99c)

# Overview
![image](https://github.com/taemin-steve/taemin-steve/assets/75752289/e56c6c72-288b-4a8c-bd05-b5c2f3f2a632)

# Condition 1 : 목부터 발끝까지 이미지 안에 나오는가?
MediaPipe를 활용하여 각각의 필수적인 관절이 사진 안에 포함되어 있는지 확인  
MediaPipe를 돌려 Joint 라고 판별한 pixel 좌표와, 해당 좌표의 precision을 Feature로 하여 2개의 Hidden Layer를 가지는 MLP 구성하여 정확도 0.94 달성
![image](https://github.com/taemin-steve/taemin-steve/assets/75752289/18363298-047f-4fed-a608-376bb3f42756)
