import React, { useState } from "react"
import { Layout } from "../components/Layout.jsx";
import { SEO } from "../components/SEO.jsx";
import { useContent } from "react-ssg";
import { Survey } from "survey-react";
import { Button } from "react-bootstrap";

const T = ({ children }) => {
  const data = useContent('/membership.yml');
  return (
    <Layout>
      <SEO title={data.title} />
      {children}
    </Layout>
  )
};

if (typeof document !== 'undefined') {
  Survey.cssType = 'bootstrapmaterial';
}

export const Membership = () => {
  const data = useContent('/membership.yml');
  const [state, setState] = useState({ stage: 'before' });
  if (state.stage === 'before') {
    return (
      <T>
        <h1>عضویت</h1>
        <p>
          در حال حاضر ما به حمایت مالی مستمر نیاز نداریم اما نیاز بسیاری به نیروی
          داوطلب داریم. زمان داوطلبان متخصص از میلیارد ها حمایت مالی با ارزش تر
          است. به وسیله پر کردن فرم عضویت، شما آمادگی خود را برای همکاری با ما
          اعلام می کنید. ما در اطلاعات به دست آمده جستجو می کنیم و در هنگام نیاز، با
          شما تماس می گیریم.
        </p>
        <p>
          نیازی به وارد کردن اطلاعات خصوصی تان نیست. ما این اطلاعات را منتشر نمی کنیم
          اما علاوه بر ما، صاحبان زیرساخت نیز به اطلاعات شما دسترسی دارند. پس به اطلاعاتی
          که از خود برای مثال در شبکه های اجتماعی منتشر می کنید بسنده کنید و از ارسال
          اطلاعات محرمانه خودداری کنید.
        </p>
        <Button onClick={() => {
          setState({ stage: 'current' });
        }}>
          من مایل به ثبت نام هستم
        </Button>
        <p />
      </T>
    );
  }
  if (state.stage === 'current') {
    return (
      <T>
        <Survey json={data.survey} onComplete={async (e) => {
          setState({ stage: 'sending', data: e.data });
          const res = await fetch("https://api.surveyjs.io/public/Survey/post", {
            method: 'POST',
            headers: {
              "Content-type": "text/json",
            },
            body: JSON.stringify({
              PostId: "884ba642-8d51-41ba-89fa-dbb3a4c4e129",
              SurveyResult: JSON.stringify({
                question1: JSON.stringify(e.data),
              }),
            }),
          });
          console.log(res);
          setState({ stage: 'finished' });
        }} />
      </T>
    );
  }
  if (state.stage === 'sending') {
    return (
      <T>
        <h1>لطفا چند لحظه صبر کنید</h1>
        <p>
          در حال ارسال اطلاعات شما هستیم.
        </p>
      </T>
    );
  }
  if (state.stage === 'finished') {
    return (
      <T>
        <h1>از شما سپاس گزاریم</h1>
        <p>
          امیدواریم که در کنار هم، بتوانیم داده های عمومی را در جهان فراگیر کنیم و
          اقدامات مفیدی برای جامعه انجام دهیم.
        </p>
      </T>
    )
  }
};
