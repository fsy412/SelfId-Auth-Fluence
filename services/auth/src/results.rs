use marine_rs_sdk::marine;

#[marine]
pub struct PermissionListResp {
    pub dids: Vec<String>,
    pub ret_code: i32,
    pub err_msg: String,
}

#[marine]
pub struct Resp {
    pub ret_code: i32,
    pub err_msg: String,
}