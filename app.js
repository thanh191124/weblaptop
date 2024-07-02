import { urlserver, CSan_Pham, CLapTop } from './common.js';
export const lay_nha_sx = async () => {
    let str = `<li class="nav-item"> <a class="nav-link" href="/">Trang chủ</a> </li>`;
    let data = await fetch(urlserver + "/nha_sx").then(res => res.json()).then(data => data);
    data.forEach(nsx => {
        str +=
            `<li class="nav-item"> 
            <a class="nav-link" href="sptheonhasx.html?id=${nsx.id}">
                ${nsx.ten} 
            </a> 
        </li>`;
    });
    return str;
};
export const layspmoi = async (sosp = 6) => {
    let data = await fetch(urlserver + `/san_pham/?_sort=-ngay&_limit=${sosp}`)
        .then(res => res.json()).then(data => data);
    let str = ``;
    data.forEach(sp => str += motsp(sp));
    str = `<div id='spmoi' class='listsp'> 
    <h2>Sản phẩm mới</h2>
    <div id='data'> ${str} </div>
    </div>`;
    return str;
};
export const motsp = (sp) => {
    let { id, ten, gia, gia_km, hinh, xem, hot, an_hien, tinh_chat, ngay, mau_sac, can_nang } = sp;
    let obj;
    obj = new CSan_Pham(id, ten, gia, gia_km, hinh, ngay, xem, hot, an_hien, tinh_chat, mau_sac, can_nang, hinh);
    return `<div class='sp'>
        <h4><a href='sp.html?id=${sp.id}'> ${sp.ten} </a> </h4>
        <img src='${obj.hinh}'>
        <p>Giá gốc: ${obj.giavnd()} &nbsp; (${obj.giausd()}) </p>
        <p>Giá bán: ${obj.giakm()}.Giảm <b> ${obj.phantramgiam()} </p>
        </p>
    </div>`;
};
export const laysphot = async (sosp = 6) => {
    let data = await fetch(urlserver + `/san_pham/?hot=1&_sort=-ngay&_limit=${sosp}`)
        .then(res => res.json()).then(data => data);
    let str = ``;
    data.forEach(sp => str += motsp(sp));
    str = ` <div id='spnoibat' class='listsp'> <h2>Sản phẩm nổi bật</h2> <div id='data'> ${str} </div> </div>`;
    return str;
};
export const laysptheonnhasx = async (id_nhasx, sosp = 6) => {
    let data = await fetch(urlserver + `/san_pham/?id_nhasx=${id_nhasx}&_sort=-ngay&_limit=${sosp}`)
        .then(r => r.json()).then(d => d);
    let str = ``;
    data.forEach(sp => str += motsp(sp));
    str = `<div id='sptheonhasx' class='listsp'> 
            <h2>Sản phẩm của nhà sản xuất </h2> 
            <div id='data'> ${str} </div> 
        </div>`;
    return str;
};
export const lay1sp = async (id = 0) => {
    let sp = await fetch(urlserver + `/san_pham/?id=${id}`).then(res => res.json()).then(data => data[0]);
    let tt = await fetch(urlserver + `/thuoc_tinh/?id_sp=${id}`).then(res => res.json()).then(d => d[0]);
    let { ten, gia, gia_km, hinh, ngay, xem, hot, an_hien, tinh_chat, mau_sac, can_nang } = sp;
    let { ram, cpu, dia, man_hinh, thong_tin_pin, cong_nghe_man_hinh, cong_ket_noi } = tt;
    let obj = new CLapTop(id, ten, gia, gia_km, hinh, ngay, xem, hot, an_hien, tinh_chat, mau_sac, can_nang, hinh, ram, cpu, dia, man_hinh, thong_tin_pin, cong_nghe_man_hinh, cong_ket_noi);
    let str = `
        <div id='left'> <img src='${obj.hinh}'> </div>
        <div id='middle'>
            <h4>${sp.ten}</h4>
            <p>Giá Gốc: ${obj.giavnd()} &nbsp; (${obj.giausd()}) </p>
            <p>Giá KM: ${obj.giakm()} Giảm ${obj.phantramgiam()} </p>
            <p>Màu sắc: ${obj.mau_sac}</p>
            <p>Cân nặng: ${obj.can_nang} kg</p>
            <p>CPU: ${obj.cpu} </p>
            <button class='btn btn-primary'> Thêm vào giỏ</buton>
        </div>
        <div id='right'>
            <p>RAM: ${obj.ram} </p>
            <p>Đĩa: ${obj.dia} </p>
            <p>Màn hình: ${obj.man_hinh} </p>
            <p>Thông tin pin: ${obj.thong_tin_pin} </p>
            <p>Công nghệ màn hình: ${obj.cong_nghe_man_hinh} </p>
            <p>Công kết nối: ${obj.cong_ket_noi} </p>
        <div>`;
    str = `<div id='chitietsp'>
    <h2>Chi tiết sản phẩm</h2>
    <div id='data'> ${str} </div>
    </div>`;
    return str;
};
