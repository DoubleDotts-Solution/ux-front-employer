/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import Ic_simplify_hiring_arrow1 from "@/assets/images/Ic_simplify_hiring_arrow1.svg";
import Ic_simplify_hiring_arrow2 from "@/assets/images/Ic_simplify_hiring_arrow2.svg";
import Ic_simplify_hiring_arrow3 from "@/assets/images/Ic_simplify_hiring_arrow3.svg";

const SimplifyHiring: React.FC = () => {
  const section3Ref = useRef<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const path1 = document.getElementById("animation1");
    const path2 = document.getElementById("animation2");

    if (!path1) {
      return;
    }
    if (!path2) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.9) {
          setIsVisible(true);

          if (section3Ref.current) {
            setTimeout(() => {
              path1.classList.add("over-animation");
              path2.classList.add("over-animation");
            }, 1000);
          }
        } else {
          setIsVisible(false);
        }
      },
      { threshold: [0, 0.9] }
    );

    if (section3Ref.current) {
      observer.observe(section3Ref.current);
    }

    return () => {
      if (section3Ref.current) {
        observer.unobserve(section3Ref.current);
      }
    };
  }, []);

  return (
    <>
      <div
        className="px-4 sm:px-5 md:px-8 lg:px-10 big:px-[120px] xBig:px-[200px] py-[48px] big:py-[72px]"
        ref={section3Ref}
      >
        <h2 className="text-primary text-2xl md:text-3xl desktop:text-4xl font-semibold desktop:leading-[54px] mb-8 lg:mb-10 desktop:mb-12">
          Simplified Hiring, Step by <br className="sm:hidden" />
          <span className="relative">
            Step.
            <svg
              // width="20"
              height="34"
              viewBox="0 0 20 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-[-3px] right-[-12px] sm:top-[-4px] sm:right-[-16px] md:top-[12px] md:right-[-24px] w-[12px] sm:w-[16px] md:w-[20px]"
            >
              <path
                d="M7.86561 1.77563C8.04655 2.47186 8.18875 3.16811 8.29214 3.88966C8.27922 3.80105 8.26626 3.7251 8.25333 3.63649C8.4472 5.04162 8.47307 6.48473 8.27921 7.88986C8.29213 7.80125 8.30503 7.72529 8.31795 7.63668C8.16287 8.77598 7.86561 9.88996 7.41327 10.9406C7.45204 10.8647 7.47793 10.7887 7.5167 10.7128C7.29699 11.2191 7.05144 11.7128 6.75419 12.1812C6.61203 12.4217 6.44399 12.6622 6.27597 12.8901C6.19843 12.9914 6.12091 13.0927 6.04337 13.1939C6.25015 12.9281 6.08212 13.1433 6.03043 13.2066C5.97873 13.2699 5.92701 13.3332 5.87531 13.3838C5.51344 13.8142 5.09989 14.2066 4.6734 14.5737C4.57001 14.6624 4.45369 14.751 4.3503 14.8396C4.28568 14.8902 4.06595 15.0548 4.33736 14.8522C4.27274 14.8902 4.22106 14.9408 4.15644 14.9915C3.91088 15.1687 3.65241 15.3333 3.39393 15.4978C2.90281 15.789 2.41167 16.0422 1.88178 16.2574C1.95933 16.2194 2.03685 16.1941 2.11439 16.1561C1.73959 16.308 1.36483 16.4599 0.990034 16.6245C0.731552 16.7384 0.486007 16.8397 0.292146 17.0295C-0.147273 17.4346 -0.0697666 18.1309 0.382576 18.4727C0.61521 18.6499 0.925426 18.7005 1.19683 18.7765C1.6621 18.9157 2.12733 19.0803 2.57967 19.2702C2.50213 19.2322 2.42461 19.2069 2.34706 19.1689C3.57485 19.6879 4.76386 20.3335 5.82363 21.1184C5.84948 21.1437 5.87534 21.1563 5.90119 21.1817C5.68148 21.0171 5.77193 21.093 5.82363 21.1184C5.88825 21.169 5.93993 21.207 6.00456 21.2576C6.12087 21.3462 6.2372 21.4475 6.34059 21.5361C6.53446 21.7133 6.7283 21.8905 6.90924 22.0931C6.99971 22.1817 7.07725 22.283 7.16772 22.3842C7.2065 22.4349 7.24525 22.4855 7.28403 22.5361C7.3228 22.5868 7.38747 22.6754 7.20653 22.4475C7.23238 22.4855 7.25818 22.5108 7.28403 22.5488C7.43912 22.7514 7.59426 22.9666 7.7235 23.1944C8.05952 23.7134 8.33089 24.2704 8.58937 24.8401C8.5506 24.7641 8.52478 24.6882 8.48601 24.6122C9.41654 26.7895 9.843 29.1314 10.2566 31.448C10.36 32.0683 10.4763 32.6886 10.5926 33.3088C10.6314 33.524 10.8511 33.7772 11.032 33.8785C11.2259 33.9798 11.4327 34.0177 11.6524 33.9924C12.1306 33.9291 12.4795 33.5367 12.4925 33.0557C12.5312 32.005 12.57 30.9543 12.6088 29.891C12.6475 28.8782 12.6475 27.8529 12.7897 26.8402C12.7768 26.9288 12.7639 27.0047 12.751 27.0933C12.8802 26.2199 13.074 25.3464 13.3067 24.4983C13.423 24.0805 13.5522 23.6628 13.6815 23.2451C13.7978 22.9033 13.9012 22.5488 14.0434 22.207C14.0046 22.283 13.9787 22.3589 13.9399 22.4349C14.1209 22.0298 14.3535 21.65 14.6249 21.2956C14.6637 21.245 14.7025 21.1943 14.7413 21.131C14.8317 21.0171 14.5732 21.3336 14.7154 21.1563C14.8058 21.0424 14.8963 20.9411 14.9868 20.8272C15.1548 20.6247 15.3358 20.4348 15.5167 20.2449C15.9044 19.8525 16.318 19.4727 16.7445 19.1056C16.8479 19.017 16.9513 18.941 17.0546 18.8524C17.1063 18.8144 17.1581 18.7765 17.2098 18.7258C17.2356 18.7005 17.2614 18.6752 17.3002 18.6625C17.2614 18.6879 17.1064 18.8145 17.2227 18.7132C17.4295 18.5613 17.6492 18.4094 17.856 18.2575C18.2825 17.979 18.7219 17.7131 19.2001 17.5232C19.1225 17.5612 19.045 17.5865 18.9675 17.6245C19.0062 17.6119 19.045 17.5992 19.0838 17.5739C19.3164 17.4853 19.5361 17.3587 19.6653 17.1435C19.7687 16.9536 19.8075 16.7511 19.7816 16.5359C19.717 16.0675 19.3164 15.713 18.8253 15.713C18.6056 15.713 18.3859 15.7004 18.1791 15.6751C18.2695 15.6877 18.3471 15.7004 18.4376 15.713C18.0111 15.6497 17.5845 15.5358 17.1839 15.3712C17.2614 15.4092 17.339 15.4345 17.4166 15.4725C17.171 15.3712 16.9383 15.2573 16.7186 15.1181C16.6023 15.0548 16.499 14.9788 16.3826 14.9155C16.3309 14.8775 16.2663 14.8396 16.2146 14.8016C16.1887 14.7889 16.1629 14.7636 16.137 14.751C16.1241 14.7383 16.1112 14.7256 16.0983 14.7256C16.0078 14.6497 16.2275 14.8269 16.2146 14.8142C15.7752 14.4598 15.3616 14.08 14.9739 13.6623C14.8834 13.5484 14.78 13.4471 14.6896 13.3332C14.6508 13.2825 14.5991 13.2192 14.5603 13.1686C14.4569 13.042 14.6637 13.2952 14.6249 13.2446C14.5991 13.2066 14.5732 13.1813 14.5474 13.1433C14.3535 12.9028 14.1855 12.6496 14.0046 12.3964C13.6427 11.8647 13.3196 11.3078 13.0224 10.7381C12.6734 10.0798 12.3503 9.39626 12.0531 8.71269C12.0918 8.78864 12.1177 8.8646 12.1564 8.94055C11.2905 6.92779 10.6184 4.82642 10.0627 2.69973C9.93347 2.20603 9.81717 1.725 9.70086 1.23131C9.58454 0.750269 8.99001 0.421129 8.51182 0.573035C8.0207 0.775577 7.73637 1.25661 7.86561 1.77563C8.13702 2.92758 8.43428 4.07955 8.78323 5.21884C9.18388 6.54802 9.64919 7.8772 10.1791 9.1684C10.7477 10.5229 11.381 11.8647 12.1823 13.1053C12.8931 14.2193 13.7461 15.3079 14.7929 16.1308C15.297 16.5232 15.8269 16.8903 16.4214 17.1435C17.0805 17.422 17.7267 17.5992 18.4505 17.6625C18.5927 17.6751 18.7348 17.6752 18.864 17.6752C18.7736 17.0549 18.696 16.4346 18.6055 15.8143C17.5458 16.2194 16.6281 16.8523 15.7493 17.5486C14.8705 18.2448 14.0434 19.0297 13.3455 19.9031C12.9965 20.3335 12.6734 20.7639 12.4149 21.2576C12.1177 21.8399 11.9238 22.4729 11.73 23.0931C11.2647 24.5995 10.8898 26.1313 10.7735 27.701C10.7089 28.5871 10.696 29.4859 10.6702 30.372C10.6443 31.2834 10.6055 32.1822 10.5797 33.0936C11.2129 33.005 11.8463 32.9291 12.4795 32.8405C12.0143 30.3213 11.6653 27.7643 10.8382 25.3338C10.4117 24.1059 9.88178 22.8779 9.10634 21.8146C8.71861 21.2703 8.27923 20.7639 7.78812 20.3082C7.21946 19.8018 6.58614 19.3461 5.93993 18.941C5.22911 18.4853 4.47954 18.0802 3.70409 17.7385C3.26467 17.5359 2.81233 17.3587 2.34706 17.1941C1.97226 17.0675 1.59744 16.9663 1.22264 16.8523C1.30019 16.8903 1.37777 16.9156 1.45531 16.9536C1.57163 17.0675 1.67497 17.1688 1.79129 17.2827C1.83006 17.3587 1.85595 17.4346 1.89472 17.5106C1.90764 17.5992 1.92054 17.6752 1.93347 17.7638C1.92054 17.8524 1.90764 17.9283 1.89472 18.0169C1.85595 18.0929 1.83006 18.1689 1.79129 18.2448C1.71374 18.3587 1.61038 18.498 1.49406 18.5486C1.51991 18.5359 1.53283 18.5233 1.55868 18.5106C1.6233 18.4727 1.68792 18.4473 1.75254 18.4094C1.93348 18.3208 2.12733 18.2448 2.32119 18.1688C2.24365 18.2068 2.16613 18.2321 2.08858 18.2701C2.61847 18.0549 3.16126 17.8397 3.67822 17.5739C4.27273 17.2701 4.82846 16.9156 5.35835 16.5232C6.48275 15.675 7.45207 14.675 8.21459 13.5104C9.68793 11.2951 10.3341 8.61141 10.3471 5.99103C10.3471 4.42133 10.1273 2.83897 9.7396 1.31991C9.61036 0.838874 9.04174 0.497091 8.55063 0.661656C8.03366 0.775586 7.72345 1.25661 7.86561 1.77563Z"
                fill="#B4178B"
                className={`floating-path ${
                  isVisible ? "start-animation" : ""
                }`}
                id="animation1"
              />
            </svg>
            <svg
              // width="28"
              height="41"
              viewBox="0 0 28 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-[-9px] right-[-30px] sm:top-[-14px] sm:right-[-39px] md:top-[-12px] md:right-[-49px] w-[16px] sm:w-[20px] md:w-[28px]"
            >
              <path
                d="M6.95895 1.19287C7.06234 1.66125 7.15282 2.12963 7.23037 2.598C7.26914 2.82586 7.3079 3.06638 7.34667 3.3069C7.3596 3.38285 7.42418 3.73731 7.37248 3.45881C7.39833 3.59806 7.4113 3.7373 7.42423 3.86389C7.54054 4.82596 7.63101 5.80069 7.68271 6.77543C7.7861 8.73755 7.77313 10.7123 7.63096 12.6618C7.59219 13.1428 7.55343 13.6239 7.51466 14.1176C7.48881 14.3328 7.47589 14.5606 7.45004 14.7758C7.43711 14.8771 7.42422 14.9784 7.41129 15.0923C7.41129 15.1429 7.39835 15.1936 7.39835 15.2315C7.38543 15.3075 7.39837 15.2695 7.41129 15.1176C7.41129 15.1556 7.39835 15.1936 7.39835 15.2315C7.28204 16.0417 7.1011 16.8392 6.88139 17.6241C6.76507 18.0165 6.63583 18.4089 6.49367 18.7887C6.41612 18.9786 6.35148 19.1684 6.27393 19.3583C6.26101 19.409 6.23517 19.4469 6.22225 19.4976C6.29979 19.2571 6.26103 19.3963 6.23519 19.4596C6.18349 19.5609 6.14471 19.6748 6.09301 19.7761C5.74406 20.5229 5.34341 21.2318 4.86522 21.9154C4.73598 22.1053 4.59385 22.2952 4.45169 22.4724C4.41292 22.523 4.33535 22.5863 4.49043 22.4218C4.45166 22.4724 4.39997 22.523 4.36119 22.5737C4.28365 22.6623 4.219 22.7509 4.14146 22.8395C3.84421 23.1813 3.53405 23.4978 3.19803 23.8142C3.03001 23.9661 2.862 24.1181 2.68106 24.27C2.59059 24.3459 2.48719 24.4092 2.40964 24.4852C2.57766 24.3206 2.51307 24.4092 2.44845 24.4598C2.39676 24.4978 2.34502 24.5358 2.2804 24.5738C1.9056 24.8396 1.505 25.0928 1.09142 25.308C0.72955 25.4979 0.522715 25.9916 0.651955 26.384C0.703652 26.5359 0.781247 26.6878 0.897564 26.8017C1.03973 26.9536 1.36281 27.1056 1.58252 27.0802C2.44843 26.979 3.31436 26.9283 4.18027 26.9536C4.60676 26.9663 5.02031 26.9916 5.44681 27.0296C5.5502 27.0423 5.66651 27.0549 5.76991 27.0676C5.84745 27.0802 6.23517 27.1309 5.89915 27.0802C6.11886 27.1182 6.33858 27.1435 6.55829 27.1815C7.39835 27.3207 8.2384 27.5233 9.05261 27.7765C9.46618 27.9031 9.87975 28.0423 10.2804 28.2069C10.3709 28.2449 10.4484 28.2702 10.5389 28.3081C10.5906 28.3335 10.6423 28.3461 10.694 28.3714C10.4226 28.2702 10.6035 28.3335 10.6681 28.3588C10.8749 28.4474 11.0688 28.536 11.2756 28.6246C12.064 28.9917 12.8265 29.3968 13.5502 29.8525C13.9121 30.0804 14.2611 30.3082 14.5971 30.5614C14.6876 30.6247 14.778 30.688 14.8685 30.7513C14.9072 30.7893 14.9589 30.8146 14.9977 30.8526C14.7909 30.7007 14.8814 30.764 14.9331 30.8019C15.1269 30.9538 15.3079 31.0931 15.4888 31.245C16.1351 31.7767 16.7554 32.359 17.324 32.9666C17.6213 33.2831 17.9056 33.6122 18.19 33.954C18.2417 34.0299 18.3063 34.0932 18.358 34.1692C18.1512 33.9287 18.3967 34.2198 18.4355 34.2831C18.5648 34.4603 18.694 34.6376 18.8232 34.8148C19.366 35.587 19.8572 36.3971 20.2708 37.2326C20.3742 37.4478 20.4775 37.663 20.568 37.8656C20.6455 38.0428 20.4775 37.6504 20.5551 37.8403C20.5809 37.9036 20.6068 37.9795 20.6326 38.0428C20.6714 38.1441 20.7101 38.2453 20.7489 38.3466C20.9298 38.8023 21.085 39.2707 21.2142 39.7391C21.3564 40.2201 21.9121 40.5619 22.4032 40.3973C22.6359 40.3214 22.8685 40.1821 22.9848 39.9669C23.1141 39.7264 23.127 39.4986 23.0882 39.2327C23.0882 39.2201 23.0494 38.9795 23.0752 39.1315C23.1011 39.2834 23.0624 39.0555 23.0624 39.0429C23.0495 38.9542 23.0365 38.8656 23.0236 38.777C22.9977 38.5745 22.9719 38.3719 22.9589 38.1694C22.9331 37.8529 22.9072 37.5364 22.8943 37.22C22.8814 36.7263 22.8943 36.2199 22.8814 35.7262C22.8814 35.1059 22.8426 34.4983 22.778 33.878C22.7263 33.4097 22.6617 32.9413 22.5971 32.4729C22.5583 32.1944 22.5196 31.9159 22.4808 31.6248C22.4679 31.5741 22.4678 31.5235 22.4549 31.4728C22.4161 31.2323 22.4808 31.6248 22.4549 31.4728C22.442 31.3336 22.4162 31.207 22.4032 31.0678C22.2869 30.169 22.1835 29.2576 22.1577 28.3461C22.1448 27.8777 22.1447 27.422 22.1835 26.9536C22.1964 26.7384 22.2093 26.5106 22.2481 26.2954C22.1964 26.5612 22.274 26.1688 22.274 26.1182C22.2998 25.9916 22.3128 25.8776 22.3386 25.7511C22.4162 25.3586 22.5325 24.9789 22.6617 24.6118C22.7134 24.4472 22.778 24.2826 22.8426 24.1181C22.8685 24.0421 22.8944 23.9662 22.9331 23.9029C22.9461 23.8522 22.9719 23.8142 22.9848 23.7636C23.0753 23.5611 22.946 23.8649 22.9848 23.7763C23.295 23.1054 23.6439 22.4597 24.0575 21.8521C24.1738 21.6876 24.3418 21.5103 24.4452 21.3331C24.4323 21.3458 24.3031 21.5103 24.4065 21.3837C24.4452 21.3331 24.484 21.2951 24.5228 21.2445C24.5874 21.1686 24.652 21.0926 24.7166 21.0166C24.988 20.7128 25.2724 20.4217 25.5826 20.1432C25.7377 20.0039 25.9056 19.8647 26.0737 19.7254C26.2029 19.6242 26.0349 19.7634 26.022 19.7634C26.0737 19.7381 26.1125 19.6875 26.1642 19.6621C26.2546 19.5989 26.3451 19.5356 26.4226 19.4723C26.7716 19.2317 27.1335 19.0292 27.5212 18.8393C27.8831 18.6621 28.0898 18.1431 27.9606 17.7633C27.8184 17.3456 27.4695 17.0924 27.03 17.0671C26.5777 17.0418 26.1253 17.0038 25.673 16.9531C25.5696 16.9405 25.4662 16.9278 25.3628 16.9152C25.3111 16.9152 25.2594 16.8899 25.2077 16.8899C25.4662 16.8772 25.2982 16.9025 25.2207 16.8899C24.988 16.8519 24.7554 16.8266 24.5357 16.7886C23.6569 16.6367 22.791 16.4468 21.9509 16.2063C21.5244 16.0797 21.1108 15.9531 20.6972 15.8012C20.5034 15.7252 20.3095 15.6619 20.1027 15.586C20.0769 15.5733 19.8055 15.4721 19.8055 15.4721C19.8443 15.4847 19.883 15.51 19.9218 15.5227C19.883 15.51 19.8443 15.4847 19.8055 15.4721C19.7538 15.4467 19.6892 15.4214 19.6375 15.3961C18.8233 15.0417 18.0478 14.6366 17.2982 14.1682C16.9234 13.9277 16.5486 13.6872 16.1997 13.4213C16.1609 13.396 16.135 13.3707 16.0962 13.3454C16.135 13.3834 16.316 13.4973 16.0962 13.3454C16.0187 13.2821 15.9282 13.2188 15.8507 13.1555C15.6698 13.0162 15.5017 12.8643 15.3337 12.7124C15.0106 12.4213 14.6876 12.1175 14.3903 11.801C14.0801 11.4719 13.8087 11.1174 13.5114 10.7883C13.6924 10.9908 13.4727 10.7377 13.4339 10.6744C13.3693 10.5857 13.3047 10.5098 13.2401 10.4212C13.0979 10.2313 12.9686 10.0414 12.8394 9.85153C12.5809 9.47177 12.3483 9.07933 12.1156 8.68691C11.6633 7.90206 11.2627 7.0919 10.8879 6.25642C10.8749 6.21844 10.8491 6.18046 10.8362 6.14248C10.8233 6.10451 10.7974 6.06653 10.7845 6.02855C10.8362 6.15514 10.8491 6.1678 10.8103 6.07919C10.7586 5.96526 10.7069 5.83866 10.6553 5.72473C10.5648 5.49687 10.4743 5.26903 10.3838 5.04117C10.2029 4.57279 10.0219 4.09174 9.85393 3.62337C9.50498 2.64864 9.18185 1.67391 8.85875 0.699175C8.70366 0.230797 8.17381 -0.123645 7.66977 0.0409205C7.15281 0.180168 6.79094 0.686519 6.95895 1.19287C8.12212 4.75001 9.33697 8.42107 11.5987 11.4719C12.7489 13.0289 14.1318 14.3707 15.7603 15.4721C17.2982 16.5101 19.0171 17.2949 20.7877 17.8646C22.8039 18.5102 24.9105 18.8646 27.03 18.9786C26.862 18.3836 26.707 17.8013 26.5389 17.2063C23.6052 18.6368 21.5632 21.485 20.6714 24.5358C20.1286 26.3967 20.1544 28.3335 20.3741 30.2323C20.4387 30.764 20.5034 31.283 20.5809 31.8146C20.5938 31.9412 20.6197 32.0552 20.6326 32.1817C20.6455 32.2324 20.6456 32.283 20.6585 32.3337C20.6973 32.5742 20.6326 32.1817 20.6585 32.3463C20.6973 32.5868 20.7231 32.84 20.7619 33.0805C20.8523 33.8274 20.9428 34.5743 20.9557 35.3211C20.9686 35.8908 20.9557 36.4604 20.9686 37.0301C20.9945 37.9289 21.0979 38.8277 21.2271 39.7264C21.8475 39.5619 22.4678 39.3846 23.1011 39.2201C22.106 35.7769 20.0381 32.6628 17.324 30.2956C14.61 27.9157 11.2498 26.1814 7.68271 25.4599C5.6924 25.0548 3.62455 24.9282 1.60839 25.1814C1.7764 25.7764 1.93147 26.3587 2.09948 26.9536C5.2788 25.2447 7.42419 22.1686 8.54859 18.852C9.13017 17.1304 9.38866 15.3455 9.53083 13.5353C9.69884 11.5352 9.75055 9.53506 9.67301 7.53496C9.58254 5.2437 9.33694 2.95245 8.85875 0.711831C8.75536 0.230794 8.14796 -0.09833 7.66977 0.0535762C7.11404 0.192824 6.85556 0.67386 6.95895 1.19287Z"
                fill="#B4178B"
                className={`floating-path ${
                  isVisible ? "start-animation" : ""
                }`}
                id="animation2"
              />
            </svg>
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-7 desktop:gap-10 z-20 relative">
          <div className="relative bg-white h-full">
            <div className="shadow-shadow1 rounded-[8px] desktop:rounded-[16px] border-2 border-primary h-full relative z-20 overflow-hidden">
              <div className="bg-lightPurple border-b-2 border-primary py-2 px-4 md:px-6 md:py-4 desktop:py-5 desktop:px-8 flex gap-3 md:gap-4 desktop:gap-5 items-start desktop:leading-[32px] text-primary font-medium text-lg sm:text-xl md:text-[20px] desktop:text-[24px] rounded-t-[8px] desktop:rounded-t-[16px] relative z-20">
                <span>1.</span>Post <br className="hidden lg:block" /> Your Job
              </div>
              <div className="p-4 md:p-6 desktop:p-8 text-base sm:text-lg md:text-xl desktop:text-[20px] text-gray bg-white relative z-20">
                Create a compelling job listing in minutes to attract top talent
              </div>
            </div>
            <img
              src={Ic_simplify_hiring_arrow1}
              alt="image"
              className="absolute z-10 hidden lg:block right-[-110px] top-[120px]"
            />
          </div>
          <div className="relative bg-white h-full">
            <div className="shadow-shadow1 rounded-[8px] desktop:rounded-[16px] border-2 border-primary relative z-20 overflow-hidden h-full">
              <div className="bg-[#FFEAE1] border-b-2 border-primary py-2 px-4 md:px-6 md:py-4 desktop:py-5 desktop:px-8 flex gap-3 md:gap-4 desktop:gap-5 items-start desktop:leading-[32px] text-primary font-medium text-lg sm:text-xl md:text-[20px] desktop:text-[24px] rounded-t-[8px] desktop:rounded-t-[16px] relative z-20">
                <span>2.</span>Receive <br className="hidden lg:block" />{" "}
                Applications
              </div>
              <div className="p-4 md:p-6 desktop:p-8 text-base sm:text-lg md:text-xl desktop:text-[20px] text-gray bg-white relative z-20">
                Let candidates come to you or explore our pool of skilled
                professionals
              </div>
            </div>
            <img
              src={Ic_simplify_hiring_arrow2}
              alt="image"
              className="absolute z-10 hidden lg:block right-[-110px] top-[120px]"
            />
          </div>
          <div className="relative bg-white h-full">
            <div className="shadow-shadow1 rounded-[8px] desktop:rounded-[16px] border-2 border-primary relative z-20 bg-white overflow-hidden h-full">
              <div className="bg-lightGreen border-b-2 border-primary py-2 px-4 md:px-6 md:py-4 desktop:py-5 desktop:px-8 flex gap-3 md:gap-4 desktop:gap-5 items-start desktop:leading-[32px] text-primary font-medium text-lg sm:text-xl md:text-[20px] desktop:text-[24px] rounded-t-[8px] desktop:rounded-t-[16px]">
                <span>3.</span>Shortlist <br className="hidden lg:block" /> and
                Hire
              </div>
              <div className="p-4 md:p-6 desktop:p-8 text-base sm:text-lg md:text-xl desktop:text-[20px] text-gray bg-white">
                Evaluate candidates, conduct interviews, select the best fit
                effortlessly
              </div>
            </div>
            <img
              src={Ic_simplify_hiring_arrow3}
              alt="image"
              className="absolute z-10 hidden lg:block right-[-30px] desktop:right-[-44px] top-[100px]"
            />
          </div>
          <div className="relative bg-white h-full">
            <div className="shadow-shadow1 rounded-[8px] desktop:rounded-[16px] border-2 border-primary relative z-20 bg-white overflow-hidden h-full">
              <div className="bg-[#D2EBFF] border-b-2 border-primary py-2 px-4 md:px-6 md:py-4 desktop:py-5 desktop:px-8 flex gap-3 md:gap-4 desktop:gap-5 items-start desktop:leading-[32px] text-primary font-medium text-lg sm:text-xl md:text-[20px] desktop:text-[24px] rounded-t-[8px] desktop:rounded-t-[16px]">
                <span>4.</span>Collaborate <br className="hidden lg:block" />{" "}
                and Grow
              </div>
              <div className="p-4 md:p-6 desktop:p-8 text-base sm:text-lg md:text-xl desktop:text-[20px] text-gray bg-white">
                Bring your vision to life with the right UX talent on your team
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SimplifyHiring;
