# pollang
React Native 투표 앱 

# 설치 및 구동
```shell
$ git clone https://github.com/samslow/pollang
$ cd pollang
$ yarn
$ cd ios && pod intall && cd ..
$ yarn start
```

# 폴랑 스크린 구성

## 투표 생성 스크린

- 내가 만든 투표 목록
    - 결과 보기
    - 제목 수정
    - 삭제
- 새 투표 만들기
    - 투표 제목
    - 투표 내용
    - 투표 기간
    - 투표 저장
    - 투표 항목(기본 3개)

## 투표 목록 스크린

- 투표 목록
    - 투표 기간 & 진행중 여부 확인
    - 투표 상세보기
- 투표 상세보기
    - 생성자일 경우 제목 수정 & 삭제
    - 투표

## 내 정보 스크린

- 닉네임 설정

# 폴랑에서 사용된 라이브러리
```json
{
  dependencies: {  
    "@react-native-community/async-storage": "^1.8.0",
    "@react-native-community/datetimepicker": "^2.2.2",
    "@react-native-community/masked-view": "^0.1.6",
    "@react-native-firebase/app": "^6.3.4",
    "@react-native-firebase/firestore": "^6.3.4",
    "@react-navigation/bottom-tabs": "^5.0.6",
    "@react-navigation/native": "^5.0.6",
    "@react-navigation/stack": "^5.0.6",
    "mobx": "^5.15.4",
    "mobx-react": "^6.1.8",
    "moment": "^2.24.0",
    "react": "16.9.0",
    "react-native": "0.61.5",
    "react-native-fast-image": "^7.0.2",
    "react-native-gesture-handler": "^1.6.0",
    "react-native-modal": "^11.5.4",
    "react-native-modal-datetime-picker": "https://github.com/fstojanac/react-native-modal-datetime-picker.git",
    "react-native-neomorph-shadows": "^0.0.6",
    "react-native-onesignal": "^3.6.4",
    "react-native-reanimated": "^1.7.0",
    "react-native-safe-area-context": "^0.7.3",
    "react-native-screens": "^2.0.0-beta.8",
    "react-native-svg": "^11.0.1",
    "react-native-vector-icons": "^6.6.0",
    "rn-placeholder": "^3.0.0"
  }
}
```

# 기타

- 야심차게 NueMorphism을 적용했는데, Android를 커버하려다보니 그림자가 지원되지 않아 Svg방식으로 지원 해 주는 라이브러리를 사용함.
  - 그래서 그런지 화면이 부드럽지 않음. ㅜㅜ
- MobX 를 Hooks에서는 처음 써 보는데, 생각만큼 되지 않아, 값이 실시간으로 바뀌는 부분이 미흡
  - 그대로 둘 순 없기에 나름의 트릭을 사용
- 실제 작업 시간은 만 24hr 정도
