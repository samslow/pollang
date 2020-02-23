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

# 사용자 스토리

- [x] 사용자는 투표를 생성할 수 있어야 한다 투표 생성자는 제목을 입력할 수 있어야 한다
- [x] 투표를 생성하면 항목이 기본으로 3개가 생성되어야 한다
- [x] 투표 생성자는 투표 항목의 이름을 변경할 수 있다
- [x] 투표 생성자는 투표를 저장할 수 있어야 한다 투표자 생성자는 투표를 삭제할 수 있어야 한다
- [x] 사용자는 만들어진 투표 리스트를 볼 수 있어야 한다
- [x] 사용자는 투표 리스트에서 제목, 생성자, 기간, 진행 중 여부를 확인 할 수 있어야 한다.
- [x] 사용자는 투표 리스트에서 특정 투표를 클릭시 투표내용 상세보기를 할 수 있다
- [x] 사용자는 투표 리스트에서 진행중인 투표에 투표 할 수 있다
- [x] 사용자는 투표 결과를 텍스트로 확인할 수 있어야 한다
- [x] 투표 생성자는 투표 기간을 설정할 수 있다(시작, 종료) 사용자는 종료시간이 지난 투표는 결과보기만 할 수 있다

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
