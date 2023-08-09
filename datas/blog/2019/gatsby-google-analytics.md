---
title: "개츠비에 구글 아날리틱스 달기"
date: "2019-05-18"
category: "dev"
published: true
---

### 설치

`npm install --save gatsby-plugin-google-analytics`

### 사용법

`gatsby-config.js` 에 아래와 같이 설정해야한다.

```javascript
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "구글-아날리틱스-추적ID",
        head: false,
        anonymize: true,
        respectDNT: true,
        exclude: ["/preview/**", "/do-not-track/me/too/"],
        // Enables Google Optimize using your container Id
        optimizeId: "YOUR_GOOGLE_OPTIMIZE_TRACKING_ID",
        // Enables Google Optimize Experiment ID
        experimentId: "YOUR_GOOGLE_EXPERIMENT_ID",
        // Set Variation ID. 0 for original 1,2,3....
        variationId: "YOUR_GOOGLE_OPTIMIZE_VARIATION_ID",
        // Any additional create only fields (optional)
        sampleRate: 5,
        siteSpeedSampleRate: 10,
        cookieDomain: "example.com",
      },
    },
  ],
}
```

### 클릭수를 추적하고 싶으면?? OutboundLink 컴포넌트를 쓰자

요렇게 쓰면 된다고 함

```
import React
import { OutboundLink } from 'gatsby-plugin-google-analytics'

export default () => {
  <div>
    <OutboundLink
      href="https://www.gatsbyjs.org/packages/gatsby-plugin-google-analytics/"
    >
      구글 아날리틱스 플러그인 페이지에 가보셈
    </OutboundLink>
  </div>
}
```

그럼 또 다음에 보아요~ 안녕~
