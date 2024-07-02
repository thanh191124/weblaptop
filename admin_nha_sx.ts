import { urlserver, TNha_SX } from "./common.js";
export const form_them_nha_sx = () => {
    return `
    <form class='col-9 m-auto border border-primary p-2'>
    <div class='mb-3'>
    Tên <input id='ten' class='form-control border-primary' type='text'>
    </div>
    <div class='mb-3'>
    Thứ tự <input id='thu_tu' class='form-control border-primary' type='number'>
    </div>
    <div class='mb-3'> Ấn hiện
    <input name='an_hien' value='0' type='radio' > An
    <input name='an_hien' value='1' type='radio' checked> Hiện
    </div>
    <button id='btn' type='button' class='btn btn-primary px-3'>Thêm</button>
    </form>`
}
export const them_nha_sx = async () => {
    let ten: string = (document.querySelector("#ten") as HTMLInputElement).value;
    let thu_tu: string = (document.querySelector("#thu_tu") as HTMLInputElement).value;
    let an_hien: string = (document.querySelector('[name=an_hien]:checked') as HTMLInputElement).value;
    let data = { ten: ten, thu_tu: thu_tu, an_hien: an_hien }
    let opt = { method: 'post', body: JSON.stringify(data), headers: { 'Content-type': 'application/json' } }
    let kq = await fetch(urlserver + `/nha_sx/`, opt).then(res => res.json()).then(data => data);
    document.location = 'nha_sx_list.html';
}
export const list_nha_sx = async () => {
    let data = await fetch(urlserver + "/nha_sx").then(res => res.json()).then(data => data)
    let arr: TNha_SX[] = data as TNha_SX[];
    let str = ``;
    data.forEach(nsx => str += motnhasx(nsx));
    str = `
        <div id='listnhasx' class='listnhasx' >
            <h2>Quản trị nhà sản xuất <a href = "nha_sx_them.html" class="float-end"> Thêm </a></h2 >
                <div id='data' >
                    <div class='nsx' > <b>id </b><b>Tên</b> <b>Thứ tự </b><b>Ấn hiện</b> <b>Thao tác </b></div >
                        ${str}
    </div>
        </div>`;
    return str;
}
const motnhasx = (nsx: TNha_SX) => `
<div class='nsx'>
<span>${nsx.id}</span>
<span>${nsx.ten}</span>
<span>${nsx.thu_tu}</span>
<span>${nsx.an_hien == 0 ? 'Đang ẩn' : 'Đang hiện'}</span>
<span>
<a href='nha_sx_sua.html?id=${nsx.id}' class='btn btn-warning px-3 me-1'>Sửa</a>
<button idnsx='${nsx.id}' class='btn btn-danger px-3 btnxoa'>Xóa</button>
</span>
</div>`
export const xoa_nha_sx = async (btn: HTMLButtonElement) => {
    let id: string = btn.getAttribute('idnsx');
    let hoi: boolean = window.confirm(`Xóa thật không vậy`)
    if (hoi == false) return;
    let opt = { method: 'delete' }
    let kq = await fetch(urlserver + `/nha_sx/${id}`, opt).then(res => res.json()).then(data => data)
    document.location = 'nha_sx_list.html';
}
export const form_sua_nha_sx = async (id: string) => {
    let url: string = urlserver + `/nha_sx/?id=${id}`;
    let nsx = await fetch(url).then(res => res.json()).then(data => data[0])
    return `
    <form class='col-9 m-auto border border-primary p-2'>
    <div class='mb-3'>
    Tên <input id='ten' value='${nsx.ten}' class='form-control border-primary' type='text'>
    </div>
    <div class='mb-3'>
    Thứ tự <input id='thu_tu' value='${nsx.thu_tu}' class='form-control border-primary' type='number'>
    </div>
    <div class='mb-3'> Ấn hiện
    <input name='an_hien' value='0' type='radio' ${nsx.an_hien==0? 'checked':'' } > Ẩn
    <input name='an_hien' value='1' type='radio' ${nsx.an_hien==1? 'checked':'' } > Hiện
    </div>
    <input type='hidden' id='id' value='${id}'>
    <button id='btn' type='button' class='btn btn-primary px-3'>Cập nhập</button>
    </form>`
}
export const sua_nha_sx =async ()=> {
    let id:string = (document.querySelector("#id") as HTMLInputElement).value;
    let ten:string = (document.querySelector("#ten") as HTMLInputElement).value;
    let thu_tu:string = (document.querySelector("#thu_tu") as HTMLInputElement).value;
    let an_hien:string = (document.querySelector("[name=an_hien]:checked") as HTMLInputElement).value;
    let data = { ten: ten, thu_tu: thu_tu, an_hien: an_hien};
    let opt =  { method: "put", body: JSON.stringify(data), headers: {'Content-type': 'application/json'}}
    let kq = await fetch (urlserver +`/nha_sx/${id}`, opt).then(res=> res.json()).then(d => d);
    document.location='nha_sx_list.html';
}
