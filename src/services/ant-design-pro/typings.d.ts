// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    id: number;
    userAccount: string;
    username: string;
    nickname: string;
    avatar?: string;
    gender: number;
    grade: string;
    college: string;
    profession: string;
    hobby: string;
    userStatus: number;
    userRole: number;
    createTime: Date;
  };

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  type RegisterResult = number;

  type UploadResult = string;


  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  /**
   * 帖子创建请求
   */
  interface PostAddRequest {
    content: string;
    userId: number;
    tags: string[];
  }

  /**
   * 帖子类
   */
  type Post = {
    id: number;
    content: string;
    reviewStatus: number;
    reviewMessage?: string;
    viewNum: number;
    thumbNum: number;
    userId: number;
    tags: string[]; // 添加tags属性
    createTime: Date;
    updateTime: Date;
  }


  /**
   * 帖子和用户类
   */
  type PostWithUser = {
    id: number;
    content: string;
    reviewStatus: number;
    reviewMessage?: string;
    viewNum: number;
    thumbNum: number;
    userId: number;
    createTime: Date;
    updateTime: Date;
    user: CurrentUser;
    hasThumb: boolean;
  }

  /**
   * 帖子点赞请求
   */
  interface PostDoThumbRequest {
    postId: number;
  }

  /**
   * 帖子删除请求
   */
  interface PostDeleteRequest {
    id: number;
  }

  /**
   * 帖子审核
   */
  type PostUpdateRequest = {
    id: number;
    content?: string;
    reviewStatus?: number;
    reviewMessage?: string;
    viewNum?: number;
    thumbNum?: number;
    userId?: number;
    createTime?: Date;
    updateTime?: Date;
  }

  /**
   * 标签
   */
  type Tag = {
    id: number;
    tagName: string;
    userId: number;
    postNum: number;
    createTime?: Date;
    updateTime?: Date;
  }


  /**
   * 标签请求
   */
  type TagSearchRequest = {
    tagName: string;
  }
  /**
   * 标签请求
   */
  type TagDeleteRequest = {
    id: number;
  }

  type PostSearchRequest = {
    id: number;
  }

  // 对接后端通用返回类
  type BaseResponse<T> = {
    code: number;
    data: T;
    message: string;
    description: string;
  }

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    userAccount?: string;
    userPassword?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type RegisterParams = {
    userAccount?: string;
    username?: string;
    userPassword?: string;
    checkPassword?: string;
    type?: string;
  };



  type AppendParams = {
    username: string;
    userAccount: string;
    avatarUrl?: string;
    gender: number;
    phone: string;
    email: string;
  };

  /**
   * 用户更新请求
   */
  interface UserUpdateRequest {
    username?: string;
    userAccount?: string;
    avatarUrl?: string;
    gender?: number;
    userRole?: number;
  }


  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
