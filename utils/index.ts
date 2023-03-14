export const protectEmail =  (email : string) => {
    var avg, splitted, part1, part2;
    splitted = email?.split("@");
    part1 = splitted[0];
    avg = part1.length / 2;
    part1 = part1.substring(0, (part1.length - avg));
    part2 = splitted[1];
    return part1 + "...@" + part2;
};

export const protectAddress = (address : string) => {
    var avg, splitted:any, part1, part2;
    splitted =  12 > 0 ? address.match(new RegExp('.{1,' + 12 + '}', 'g')) : [address];
    part1 = splitted[0];
    avg = part1.length / 2;
    // part1 = part1.substring(0, (part1.length - avg));
    part2 = splitted[splitted.length - 1];
    return part1 + "..." + part2;
}