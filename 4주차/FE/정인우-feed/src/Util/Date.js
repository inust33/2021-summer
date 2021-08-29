export default function DateDiff(date) {
    let now = new Date();
    let datediff = now.getTime() - date.getTime();

    let past_time;

    if (datediff / (1000 * 60) < 1) {
        past_time = '방금 전'
    } else if (datediff / (1000 * 60) < 60) {
        past_time = `${Math.round(datediff / (1000 * 60))}분 전`
    } else if (datediff / (1000 * 60 * 60) < 24) {
        past_time = `${Math.round(datediff / (1000 * 60 * 60))}시간 전`
    } else if (datediff / (1000 * 60 * 60 * 24) < 7) {
        past_time = `${Math.round(datediff / (1000 * 60 * 60 * 24))}일 전`
    } else {
        past_time = null;
    }


    return past_time;
}
