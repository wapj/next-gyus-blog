---
title: "leetcode 78번 부분집합문제"
date: "2021-09-05"
tags: ["leetcode", "subsets"]
category: dev
featured: "/images/2021/2021_09_05.png"
published: true
---

## 문제 링크

https://leetcode.com/problems/subsets/


문제

```
고유한 요소 의 정수 배열 nums이 주어지면 가능한 모든 부분집합을 반환한다.
정답의 집합 에는 중복된 부분집합이 포함 되어서 는 안 된다.
순서는 상관 없음
```

예 1:

```
입력: 숫자 = [1,2,3]
출력: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1, 2,3]]
```

예 2:
```
입력: 숫자 = [0]
출력: [[],[0]]
```

## 풀이

![images/2021_09_05_01.jpg](/images/2021/2021_09_05_01.jpg)

정답 풀이에도 있는데, cascading 방식으로 풀었다.

 
```python
class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        n = len(nums)
        result = [[]]

        for num in nums:
            result += [r + [num] for r in result]

        return result
```

백트래킹으로 푸는 방식도 있던데, 이건 다음에 알아봐야겠다.
