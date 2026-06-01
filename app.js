// 1. 방금 복사해 온 내 Firebase 접속 열쇠를 여기에 붙여넣으세요!
const firebaseConfig = {
    apiKey: "AIzaSyAP3rIuuAp_685KbZUupy1gB4eynqnTbjk",
  authDomain: "smart11-f49d9.firebaseapp.com",
  databaseURL: "https://smart11-f49d9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smart11-f49d9",
  storageBucket: "smart11-f49d9.firebasestorage.app",
  messagingSenderId: "938534435163",
  appId: "1:938534435163:web:7255b1338c9d5a3c52027e",
  measurementId: "G-T9PEZX449S"
};

// 2. Firebase 초기화 (시동 걸기)
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// ==========================================
// 기능 1: 실시간 데이터 읽어오기 (모니터링)
// ==========================================
// 'brewery_device_01/monitoring' 경로의 데이터를 실시간으로 감시합니다.
const monitoringRef = db.ref('brewery_device_01/monitoring');

monitoringRef.on('value', (snapshot) => {
    const data = snapshot.val();
    
    // 데이터가 존재하면 HTML 화면의 글자를 바꿔치기 합니다.
    if(data) {
        document.getElementById('curr_temp').innerText = data.temperature || '--';
        document.getElementById('curr_abv').innerText = data.abv || '--';
        document.getElementById('uptime').innerText = data.elapsed_time || '--';
    }
});

// ==========================================
// 기능 2: 설정값 저장하기 (제어 명령 쏘기)
// ==========================================
// HTML에서 '설정 적용하기' 버튼을 누르면 이 함수가 실행됩니다.
function updateSettings() {
    const targetTemp = document.getElementById('target_temp_input').value;
    const stirCount = document.getElementById('stir_count_select').value;

    // 'brewery_device_01/control' 경로에 사용자가 입력한 값을 덮어씁니다.
    db.ref('brewery_device_01/control').set({
        target_temperature: Number(targetTemp),
        stir_frequency: Number(stirCount)
    }).then(() => {
        alert("설정이 기기로 전송되었습니다! 🚀");
    }).catch((error) => {
        console.error("저장 실패:", error);
        alert("저장에 실패했습니다.");
    });
}