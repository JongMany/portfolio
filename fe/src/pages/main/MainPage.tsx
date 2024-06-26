import { DetailHelmet } from "../../components/meta/DetailHelmet";

export default function MainPage() {
  return (
    <>
      <DetailHelmet
        title="메인"
        pageTitle="방구석 코딩쟁이의 코딩 일대기"
        url={import.meta.env.VITE_BASE_URL + "/main"}
        shortDesc="방구석 코딩쟁이의 포트폴리오를 소개합니다."
      />
      <></>
    </>
  );
}
