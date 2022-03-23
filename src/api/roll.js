import instance from "@/utils/request";
/**
 * 随机获得关卡
 */
export function findCheckPoint() {
    return instance.get(`arknight/checkpoint`)
}

/**
 * 随机获得优势
 */
export function findSuperiority() {
    return instance.get(`arknight/superiority`)
}

/**
 * 随机获得劣势
 */
export function findDisadvantaged() {
    return instance.get(`arknight/disadvantaged`)
}

/**
 * 获取额外的两项优势
 * @param Superiority
 * @returns {*}
 */
export function findSuperiorityAgain(Superiority) {
    return instance.post(`arknight/superiorityAgain`,Superiority)
}

/**
 * 获取额外的一项优势
 * @param Superiority
 * @returns {*}
 */
export function findSuperiorityAgain2(Superiority) {
    return instance.post(`arknight/superiorityAgain2`,Superiority)
}

/**
 * 获取额外的两项劣势
 * @param Disadvantaged
 * @returns {*}
 */
export function findDisadvantagedAgain(Disadvantaged) {
    return instance.post(`arknight/disadvantagedAgain`,Disadvantaged)
}
