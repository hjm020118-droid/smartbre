import firebase_admin
from firebase_admin import credentials, db

print("🔥 [치트키 발동] 가짜 발효 데이터 주입기 가동!")

# 1. 파이어베이스 계정 초기화 (기존 코드와 동일)
cred = credentials.Certificate('./firebase_key.json')
# 주의: 아래 URL은 지민님의 진짜 파이어베이스 주소로 꼭 바꿔주세요!
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://smart11-f49d9-default-rtdb.asia-southeast1.firebasedatabase.app/' 
})

history_ref = db.reference('brewery_device_01/history')

# 2. 기존에 있던 지저분한 데이터 싹 지우기 (초기화)
history_ref.delete()
print("🗑️ 기존 히스토리 싹 지움!")

# 3. 예쁘게 상승하는 가짜 데이터 30개 만들기
start_temp = 20.0  # 20도에서 시작
print("🛠️ 가짜 데이터 30개 생성 및 전송 중...")

for i in range(30):
    # 시간은 12:00 ~ 12:29 로 조작
    time_str = f"12:{i:02d}"
    
    # 온도는 20도에서 시작해서 0.2도씩 스르륵 오르다가 약간 흔들리게 조작
    fake_temp = start_temp + (i * 0.2) 
    
    # 파이어베이스에 밀어넣기!
    history_ref.push({
        'time': time_str,
        'temp': round(fake_temp, 1)
    })

print("🎉 완료! 스마트폰 웹을 새로고침하면 20도 -> 26도로 예쁘게 오르는 그래프가 보일 겁니다!")