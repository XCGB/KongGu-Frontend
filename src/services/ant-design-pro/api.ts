// @ts-ignore
/* eslint-disable */
import request from "@/plugins/globalRequest";

/** 获取当前的用户 GET /api/user/current */
export async function currentUser(options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.CurrentUser>>('/api/user/current', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/user/logout */
export async function outLogin(options?: { [key: string]: any }) {
  return request<API.BaseResponse<number>>('/api/user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/user/login */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.LoginResult>>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 注册接口 POST /api/user/register */
export async function register(body: API.RegisterParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.RegisterResult>>('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 搜索用户 GET /api/user/search */
export async function searchUsers(options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.CurrentUser[]>>('/api/user/search', {
    method: 'GET',
    params: options, // 将options作为查询参数传递给后端
  });
}

/** 删除用户 GET /api/user/delete */
export async function deleteUsers(options?: number) {
  return request<API.BaseResponse<API.CurrentUser[]>>('/api/user/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {id: options}, // 将 options 作为请求体传递给后端，可以根据实际需求进行调整
  });
}

/** 上传图片 POST /api/upload */
export async function uploadAvatar(file) {
  const formData = new FormData();
  formData.append('image', file);

  return await request<API.BaseResponse<API.UploadResult>>('/api/upload/avatar', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  });
}

/** 新增用户 POST /api/user/append */
export async function appendUser(body: API.AppendParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.RegisterResult>>('/api/user/append', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新个人信息 PUT /api/user/update/${id}*/
export async function updateLoginUser(id: number, params: API.UserUpdateRequest) {
  return request<API.BaseResponse<boolean>>(`/api/user/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

/**
 * 创建帖子
 * @param params
 */
export async function addPost(params: API.PostAddRequest) {
  return request<API.BaseResponse<number>>('/api/post/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}


/** 查询所有帖子及发布者信息 GET /api/post/listByUser */
export async function listPostWithUser(options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.PostWithUser>>('/api/post/listByUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/**
 * 点赞 / 取消点赞 /api/post/thumb
 * @param params
 */
export async function postDoThumb(params: API.PostDoThumbRequest) {
  return request<API.BaseResponse<number>>(`/api/post/thumb`, {
    method: 'POST',
    params: { ...params },
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

/**
 * 删除帖子（管理员）
 * @param params
 */
export async function deletePost(params: API.PostDeleteRequest) {
  return request<API.BaseResponse<boolean>>(`/api/post/delete/` + params.id, {
    method: 'DELETE',
    // params: { ...params },
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

/** 查询所有帖子 GET /api/post/list */
export async function listPost(options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.Post[]>>('/api/post/list', {
    method: 'GET',
    params: options, // 将options作为查询参数传递给后端
  });
}

/**
 * 更新帖子状态
 * @param params
 */
export async function updatePost(params: API.PostUpdateRequest) {
  return request<API.BaseResponse<boolean>>(`/api/post/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

/**
 * 搜索当前用户的帖子
 * @param params
 */
export async function searchPost(params: API.PostSearchRequest) {
  return request<API.BaseResponse<API.Post[]>>(`/api/post/search/`  + params.id, {
    method: 'GET',
    ...(params || {}),
  });
}

/**
 * 获取所有的标签
 */
export async function listTags(params: API.Tag) {
  return request<API.BaseResponse<API.Tag[]>>(`/api/tag/list` , {
    method: 'GET',
    params: params, // 将options作为查询参数传递给后端
  });
}


/** 新增标签 POST /api/tag/add */
export async function addTag(params: API.TagAddRequest) {
  return request<API.BaseResponse<number>>('/api/tag/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

// /** 新增用户 POST /api/user/append */
// export async function appendUser(body: API.AppendParams, options?: { [key: string]: any }) {
//   return request<API.BaseResponse<API.RegisterResult>>('/api/user/append', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     data: body,
//     ...(options || {}),
//   });
// }


export async function deleteTag(options?: number) {
  return request<API.BaseResponse<boolean>>(`/api/tag/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {id: options}, // 将 options 作为请求体传递给后端，可以根据实际需求进行调整
  });
}

export async function changeTagColor(tagId: string, tagColor: string) {
  return request<API.BaseResponse<boolean>>(`/api/tag/changeColor`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      tagId: tagId,
      tagColor: tagColor,
    },
  });
}
