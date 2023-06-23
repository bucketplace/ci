# Multi Module Releaser
패키지에 하나 이상의 모듈이 있을때 릴리즈를 도와주는 github action 입니다.
본 액션의 기능은 아래와 같습니다.
 - `module/<module-name>` 태그가 붙은 PR만 수집하여 ChangeLog를 생성
 - bump를 SemVer의 다음 버전을 생성 (major, minor, patch)
 - 위 두가지 정보를 활용하여 Release 생성
 - `workflow-file` 옵션 제공시, 실제 릴리즈를 실행할 수 있는 workflow 실행

## 설치
### Workflow 설정

Action은 아래와 같이 설정하여 사용 가능합니다.

```yml
# .github/workflows/module-release.yml

name: Module Release

on:
  workflow_dispatch:
    inputs:
      module:
        type: choice
        description: '배포할 모듈을 선택해 주세요.'
        required: true
        default: 'some-module'
        options:
          - 'some-module'
          - 'other-module'
          - 'more-module'
      bump:
        type: choice
        description: '증가할 버전을 선택해 주세요. (major, minor, patch)'
        required: true
        default: 'patch'
        options:
          - 'major'
          - 'minor'
          - 'patch'

jobs:
  release:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      actions: write
      pull-requests: read
    steps:
    - uses: actions/checkout@v3
    - name: 'Release Module'
      id: release_module
      uses: bucketplace/ci/.github/actions/multimodule-releaser@latest
      with:
        module: ${{ inputs.module }}
        workflow-file: '${{ inputs.module }}-deploy.yml'
        workflow-inputs: '{"name": "james"}'
        bump: ${{ inputs.bump }}
        latest: true
```

위의 액션을 생성, 액션메뉴로 들어가면 Action run history 목록 상단에 `Run workflow` 버튼이 생성됩니다.
![run workflow 버튼](images/run_workflows.png)

이 버튼을 누르고 Bump 옵션을 선택하면 버전이 하나 올라간 새로운 릴리즈가 생성됩니다.

예를 들면 `some-module` 및 `patch` 선택시, 이전에 `some-module-1.0.0` 버전이 있었다면  `some-module-1.0.1` 버전으로 릴리즈가 생성되고 `module/some-module` 라벨이 붙은 PR들을 모두 수집하여 Changelog를 만들어 줍니다.

일반적으로 이 액션 이후 step으로 이어서 실제 배포 작업을 진행해도 되지만 이렇게 할 경우 workflow run의 이름이 모두 같은 문제가 발생한다.
따라서 이후에 아래와 같은 배포용 workflow를 따로 제작하여 실행하면 조금 더 유용하게 활용할 수 있다. (추가로 approve 등의 작업도 가능하다.)

```yml
# .github/workflows/some-module-deploy.yml

name: Deploy some-module
run-name: ${{ github.ref_name }}

on:
  workflow_dispatch:
    inputs:
      name:
        type: string
        required: false
        default: ""

jobs:
  hello-world:
    runs-on: ubuntu-latest
    steps:
    - id: hello
      run: |
        echo "hello ${{ inputs.name }}!!"
```

아래와 같이 버전명으로 workflow run History가 생성된다.
![run history](images/workflow_run_history.png)

## **🚨 주의점**
### 최초 버전
본 액션은 항상 기존에 Release 된 버전을 기준으로 하나 증가하여 배포합니다. 따라서 반드시 같은 형식의 버전 Release가 이미 최소 하나는 있어야 합니다. 예를 들어 Module 명이 `some-module`이고 version 이 `1.0.0` 부터 시작이라면 본 Action을 사용하기 전 반드시 `some-version-1.0.0` 태그 및 릴리즈가 이미 배포되어 있어야 오류가 나지 않습니다. 최초 버전은 수동으로 릴리즈 해주시길 부탁드립니다.

## Inputs
| **Input**         | **Description**                                                                                                                                     |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `module`          | 빌드하고자 하는 모듈 명, 버전의 Prefix로도 사용된다. 필수 옵션이다.                                                                                 |
| `workflow-file`   | 실제 배포가 진행되는 workflow 파일 경로, 없을 경우 추가 workflow 를 실행하지 않는다                                                                 |
| `workflow-inputs` | 실제 배포가 진행되는 workflow에 전달할 Input, Json string 형태이며, 없을 경우 input을 전달하지 않는다.                                              |
| `bump`            | SemVer 버전의 어떤 파트를 올릴지 선택하는 옵션. 필수이며 기본값은 `patch` 이다. (`major`, `minor`, `patch` 중 택 1)                                 |
| `latest`          | 릴리즈 시에 해당 릴리즈를 latest로 만들 것인지에 대한 선택. 기본값은 false 이다.                                                                    |
| `divider`         | Tag명을 결정할때 Prefix 와 Version 사이에 구분자. 기본값은 `-` 이며, 경우에 따라 변경 가능하다 (`/v` 일 경우 some-module/v1.0.0 형태로 버전이 생성) |
| `date-suffix`     | Release 를 등록할때 이 값이 있으면 `@YYMMDD` 형태의 날짜 정보를 suffix로 추가해준다.                                                                |
