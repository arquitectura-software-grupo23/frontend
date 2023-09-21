# Como hacer deploy
```
aws s3 sync dist/ s3://frontend.stocknet.me --delete
aws cloudfront create-invalidation --distribution-id E1Z7WTDKI7A9OO --paths "/*
```
