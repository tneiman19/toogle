export default function WrongPage() {
  return (
    <>
      <div className="bg-error flex flex-col items-center p-4 w-full">
        <div className="text-3xl lg:text-6xl font-bold">
          404: Secret Service engaged!
        </div>
        <div className="mt-4 text-sm lg:text-xl lg:w-2/3 text-center">
          <span>
            {" "}
            You've stumbled upon classified territory, citizen. This page is so
            exclusive, even we're not supposed to see it! Don't worry, our
            highly trained hamsters are working diligently to investigate this
            mysterious disappearance.
          </span>
        </div>
      </div>
      <img src={require("../images/wrongPage.jpg")} className="w-full" />
    </>
  );
}
