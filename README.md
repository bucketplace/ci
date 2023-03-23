# Bucketplace CI Workflows

Bucketplace의 Continuous Integration (CI)를 위한 공통 Workflows 를 제공하는 저장소입니다.

각각의 Workflows의 설명은 아래 항목을 참조하세요.

## Usage

변경사항이 `main` 브랜치에 병합되면 자동으로 `latest` 태그가 달려 모든 `bucketplace/*` 저장소에서 활용할 수 있게 배포됩니다.

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

## Workflows

전체 워크플로우 리스트는 [.github/workflows/*](https://github.com/bucketplace/ci/tree/main/.github/workflows) 폴더를 참조하세요.
