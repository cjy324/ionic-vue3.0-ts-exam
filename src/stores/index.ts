import { GlobalState } from '@/types'
import { reactive } from "@vue/reactivity"
import { inject, computed } from "vue"

//Symbol()
//'심볼(symbol)'은 유일한 식별자(unique identifier)를 만들고 싶을 때 사용합니다.
//자바스크립트는 객체 프로퍼티 키로 오직 문자형과 심볼형만을 허용합니다. 숫자형, 불린형 모두 불가능하고 오직 문자형과 심볼형만 가능하죠.
//Symbol()을 사용하면 심볼값을 만들 수 있습니다.
//심볼을 만들 때 심볼 이름이라 불리는 설명을 붙일 수도 있습니다.
//여기에서 심볼이릉은 'globalState'
//심볼은 유일성이 보장되는 자료형이기 때문에, 설명이 동일한 심볼을 여러 개 만들어도 각 심볼값은 다릅니다. 심볼에 붙이는 설명(심볼 이름)은 어떤 것에도 영향을 주지 않는 이름표 역할만을 합니다.
//설명 더보기 https://ko.javascript.info/symbol

export const globalStateSymbol = Symbol('globalState');

//전역적으로 사용할 것들 이곳에 등록
//그리고 types에서도 자료형? 등록 필요
//전역상태를 셋팅해놓는 이유는 여러 페이지에서 사용하기 위함
export const createGlobalState = () => {
  const globalState: GlobalState = reactive({
    loginedMember: {
      id:0,
      regDate:"",
      updateDate:"",
      authLevel:0,
      cellphoneNo:"",
      email:"",
      /* eslint-disable @typescript-eslint/camelcase */
      extra__thumbImg:"",
      loginId:"",
      name:"",
      nickname:""
    },
    isLogined: computed(() => globalState.loginedMember.id != 0)
  });

  return globalState;
};

//useGlobalState 함수가 GlobalState 객체를 리턴한다
export const useGlobalState = (): GlobalState => inject(globalStateSymbol) as GlobalState;