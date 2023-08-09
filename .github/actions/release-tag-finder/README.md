## Release Tag Finder

현재 릴리즈된 가장 높은 버전의 태그를 찾고, 필요시 다음 태그를 생성해준다.

latest-tag-finder와 가장 큰 차이는 실행 브랜치와 상관없이 전체 repository에서 가장 높은 버전의 태그를 찾기 때문에, 하나 이상의 버전을 유지할 때는 유용하지 않습니다.

# Inputs
| **Input** | **Description**                                                                                                     |
| --------- | ------------------------------------------------------------------------------------------------------------------- |
| `prefix`  | 찾고자 하는 버전의 Prefix (eg. sample-service-v)                                                                    |
| `bump`    | SemVer 버전의 어떤 파트를 올릴지 선택하는 옵션. 필수이며 기본값은 `patch` 이다. (`major`, `minor`, `patch` 중 택 1) |
| `ref`     | 어디서부터 Tag를 찾을지 결정 기본값은 action이 실행된 ref                                                           |

# Outputs
| **Output**        | **Description**                                               |
| ----------------- | ------------------------------------------------------------- |
| `next-tag`        | 다음 Tag, prefix가 포함되어 있습니다. (sample-service-v1.0.2) |
| `current-tag`     | 현재 Tag, prefix가 포함되어 있습니다. (sample-service-v1.0.1) |
| `next-version`    | 다음 Version, prefix가 없이 버전만 표시됩니다. (1.0.2)        |
| `current-version` | 현재 Version, prefix가 없이 버전만 표시됩니다. (1.0.1)        |
| `major`           | 다음 버전의 major 버전 (1)                                    |
| `minor`           | 다음 버전의 minor 버전 (0)                                    |
| `patch`           | 다음 버전의 patch 버전 (2)                                    |
