use marine_rs_sdk::marine;
use crate::results::PermissionListResp;
use once_cell::sync::OnceCell;
use parking_lot::Mutex;
use std::collections::HashMap;
use crate::results::Resp;

#[marine]
fn auth(did:String) -> bool {
   let data = get_data().lock();
   data.contains_key(&did)
}

#[marine]
fn add_permission(did:String) -> Resp {
    let mut data = get_data().lock();
    data.insert(did.clone(), true);
    Resp{
        ret_code:0,
        err_msg: "success".to_string(),
    }
}

#[marine]
fn remove_permission(did:String) -> Resp {
    let mut data = get_data().lock();
    data.remove(&did);
    Resp{
        ret_code:0,
        err_msg: "success".to_string(),
    }
}

#[marine]
fn get_permission_list() -> PermissionListResp {
    let data = get_data().lock();
    let mut list:Vec<String> = Vec::new();
    for (k, _) in data.iter() {
        list.push(k.to_string())
    }
    PermissionListResp{
        dids:list,
        ret_code:0,
        err_msg: "success".to_string(),
    }
}

static INSTANCE: OnceCell<Mutex<HashMap<String, bool>>> = OnceCell::new();

fn get_data() -> &'static Mutex<HashMap<String, bool>> {
    INSTANCE.get_or_init(|| <_>::default())
}