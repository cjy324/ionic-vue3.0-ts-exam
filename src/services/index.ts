//service를 통해 mainAPI를 가져오는 방식으로 변경
//MVC패턴 같은 느낌
//import { MainService } from "@/types";
import { Member } from "@/types";
import { inject } from "vue";
import { getMainApi, MainApi } from "@/apis";  //service를 통해 mainAPI를 가져오는 방식으로 변경

  export class MainService {
    private mainApi: MainApi;
  
    constructor() {
      this.mainApi = getMainApi();
    }

    //camelcase??
    //일반적으로 객체 명명은 memberAuthKey 이런식으로 함
    //이런 명명법을 camelcase라고함
    //typescript에선 camelcase방식을 권장하지만 이것을 무시할 수도 있음(큰 문제는 없음)
    //이를 무시하기 위해 아래와 같이 주석을 달아줌
  
    /* eslint-disable @typescript-eslint/camelcase */
    member_authKey(loginId: string, loginPw: string) {
      return this.mainApi.member_authKey(loginId, loginPw);
    }
  
    getMemberThumbImgUrl(member: Member) {
      // const originUrl = 'http://localhost:8024/common/genFile/file/member/' + member.id + '/common/attachment/1';
      // //이미지를 리사이징해주는 유틸
      // //사용하려면 작동을 시켜야 함..일단은 적용 보류(21.04.01)
      // const url = 'http://localhost:8085/img?failWidth=40&failHeight=40&failText=U.U&width=40&height=40&url=' + originUrl;
      // return url;
      return "https://i.pravatar.cc/45?img=13&k=" + member.id
    }
  }
  
  export const mainServiceSymbol = Symbol('globalState');
  
  class Singleton {
    static mainService: MainService;
  }
  
  export const createMainService = () => {
    if ( Singleton.mainService == null ) {
      Singleton.mainService = new MainService();
    }
  
    return Singleton.mainService;
  };
  
  export const useMainService = (): MainService => inject(mainServiceSymbol) as MainService;