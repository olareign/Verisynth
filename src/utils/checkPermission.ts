import CustomAPIError from "../errors/index";
import constant from "./constant";

const checkPermissions = (requestUser: any, resourceUserId: any): any => {
    // console.log(requestUser);
    // console.log(resourceUserId.toString());
    if (requestUser.role === constant.ROLES["ISSUER"]) return;
    if (requestUser.userId === resourceUserId.toString()) return;
    throw new CustomAPIError.AuthorizationError('Unauthorize Access to resources')
}

export {
    checkPermissions
}