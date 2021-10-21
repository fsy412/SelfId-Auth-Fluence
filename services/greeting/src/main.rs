use marine_rs_sdk::marine;
use marine_rs_sdk::module_manifest;

module_manifest!();

pub fn main() {}

#[marine]
pub fn greeting(auth:bool, did: String) -> String {
    if auth {
        format!("Hi, {}", did)
    }else{
        format!("You are not authorized")
    }
}
