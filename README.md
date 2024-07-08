# 포트폴리오 웹사이트

# 마주했던 에러

1. SEO 최적화

   a. React Helmet Async + Prerenderer 를 활용하여 SEO 최적화를 시도

   ```
   [plugin:Prerender Plugin] [plugin Prerender Plugin] Unable to prerender all routes!
   x Build failed in 3.47s
   error during build:
   [Prerender Plugin] [plugin Prerender Plugin] listen EACCES: permission denied 127.0.0.1:443
       at getRollupError (file:///home/ec2-user/git/ci-cd-study/fe/node_modules/rollup/dist/es/shared/parseAst.js:396:41)
       at error (file:///home/ec2-user/git/ci-cd-study/fe/node_modules/rollup/dist/es/shared/parseAst.js:392:42)
       at Object.error (file:///home/ec2-user/git/ci-cd-study/fe/node_modules/rollup/dist/es/shared/node-entry.js:19589:20)
       at Object.<anonymous> (/home/ec2-user/git/ci-cd-study/fe/node_modules/@prerenderer/rollup-plugin/dist/RollupPrerenderPlugin.js:140:34)
       at Generator.throw (<anonymous>)
       at rejected (/home/ec2-user/git/ci-cd-study/fe/node_modules/@prerenderer/rollup-plugin/dist/RollupPrerenderPlugin.js:29:65)
       at processTicksAndRejections (node:internal/process/task_queues:96:5)
   ```

   - 위와 같은 에러 발생하여 Prerenderer/@Puppeteer 레포지토리의 이슈를 확인해봤으나 동일 문제는 발생하지 않음

   b. Github 내의 문서를 통해 옵션을 새로 설정 + EC2의 리눅스에 퍼피티어를 설치

   ```
   sudo yum update -y
   sudo yum install -y atk.x86_64 cups-libs.x86_64 gtk3.x86_64 libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 libXext.x86_64 libXi.x86_64 libXtst.x86_64 pango.x86_64 alsa-lib.x86_64
   ```

   c. 결과

   - 검색 결과에 잘 노출이 됨을 확인
     <img width="965" alt="스크린샷 2024-07-08 오전 11 57 44" src="https://github.com/JongMany/portfolio/assets/61236589/e4a64c0e-c2a1-47dd-8ba2-dafcf9b993dc">

2. EC2의 성능으로 프로젝트 빌드를 하지 못하였음

   a. Node.js의 메모리를 늘리기

   ```
   1. 현재 용량 확인하기
   $ node -e 'console.log(v8.getHeapStatistics().heap_size_limit/(1024*1024))'
   $ 499.25

   2. 용량 늘리기
   NODE_OPTIONS=--max-old-space-size=8000 npm run build
   ```

   - 이 방법으로도 해결되지 않음

   b. 메모리 스왑 방식 사용

   ```
   sudo dd if=/dev/zero of=/mnt/swapfile bs=1M count=2048
   sudo mkswap /mnt/swapfile
   sudo swapon /mnt/swapfile
   ```

   - 부족한 RAM 메모리를 디스크의 일부를 대신 사용하도록 설정해줌으로써 메모리 문제를 해결하는 방법을 활용
   - 이 방법으로는 해결이 됨

   c. 사용하지 않는 의존성들 제거

   - 직접 구현할 수 있는 코드는 직접 만들어 사용하고 해당 라이브러리들은 제거

# 사용한 라이브러리

### 프론트엔드

#### UI라이브러리

- React
- TailwindCSS
- Three.js / Framer Motion
- WebGL (GLSL)

#### SEO 최적화

- React-Helmet-Async / Puppeteer / @prerenderer

#### Testing

- Vitest / React Testing Library

### 백엔드

# 실행 방법

### 프론트엔드

1. 루트 경로에서 fe 폴더로 이동

```
cd ./fe
```

2. 패키지, 의존성 설치

```
npm install
```

3. 프로젝트 실행

```
npm run dev
```

### 백엔드

1. 루트경로에서 be 폴더로 이동

```
cd ./be
```

2. 패키지 및 의존성 설치

```
npm install
```

3. 프로젝트 실행

```
npm run dev
```

# 빌드 및 배포 방법

1. AWS EC2 환경에서 프론트엔드, 백엔드 배포
2. Nginx를 사용
