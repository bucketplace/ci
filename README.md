# Bucketplace CI Workflows

Bucketplace의 Continuous Integration (CI)를 위한 공통 Workflows 를 제공하는 저장소입니다.

각각의 Workflows의 설명은 아래 항목을 참조하세요.

## Usage

`bucketplace/*` 저장소에서 활용할 수 있는 action 및 reusable-workflow가 제공됩니다.

사용하는 단에선 다음 예시와 같이 지정하여 활용할 수 있습니다:

```yml
name: Run Node.js Test

on:
  - pull_request

jobs:
  run-test:
    name: Run Node.js Test
    uses: bucketplace/ci/.github/workflows/check-nodejs.yml@latest # << notice here
```

필요에 따라 `latest`(사용 추천), `v2`(필요시), `v1`(레거시), `rc`(야수의 심장 소유자) 등의 버전을 사용할 수 있습니다.

## Workflows & Actions

재사용 가능한 워크플로우 리스트는 [.github/workflows/*](https://github.com/bucketplace/ci/tree/main/.github/workflows) 폴더를 참조하세요.

(이때 `release.yml`, `release-candidate.yml` 은 본 패키지를 위한 워크플로우이므로 재사용이 용이하지 않습니다.)

재사용 가능한 액션 리스트는 [.github/actions/*](https://github.com/bucketplace/ci/tree/main/.github/actions) 폴더를 참조하세요

## How to Release new Version
```
 🚨 Github의 Release 기능을 이용하여 수동으로 release 하시면 안됩니다!
```

변경사항이 `main` 브랜치에 병합되면 자동으로 `rc` 태그가 달려 테스트가 가능해집니다.

새로운 버전을 Release 할때는, 저장소 상단의 Actions 탭에서 [`Release CI Workflows and Actions`](https://github.com/bucketplace/ci/actions/workflows/release.yml) Workflow를 선택합니다.

그러면 우측 상단의 `Run workflow`라는 버튼이 있는데 이 버튼을 눌러 배포할 수 있습니다.

이때, 어떤 버전을 올릴지 선택가능하며(major, minor, patch), 기본은 patch 버전이 올라갑니다.

