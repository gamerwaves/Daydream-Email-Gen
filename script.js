const markdownInput = document.getElementById('markdownInput');
const preview = document.getElementById('preview');
const headerUpload = document.getElementById('headerUpload');
const copyBtn = document.getElementById('copyBtn');
let headerImage = "https://hc-cdn.hel1.your-objectstorage.com/s/v3/47975851997a41d0b7415b5307a51f7024340d9e_headers-2.png";

marked.setOptions({ breaks: true, gfm: true });

function renderPreview() {
    const md = marked.parse(markdownInput.value);
    preview.innerHTML = `
    <div style="background-color:#C2EDFB; padding:0; margin:0;">
        <header style="text-align:center; padding:0; background-color:#C2EDFB;">
            ${headerImage ? `<img src="${headerImage}" alt="Header Image" style="width:100%; height:auto;">` : ""}
        </header>
        <div style="margin:20px auto; padding:30px; max-width:600px; background-color:#C2EDFB;">
            ${md}
        </div>
        <footer style="text-align:center; padding:0; background-color:#C2EDFB;">
            <img src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/3109e1a048b5f09f8fe02737617df86c0d74c1bd_footer-2.png" alt="Footer Image" style="width:100%; height:auto;">
        </footer>
    </div>`;
}

markdownInput.addEventListener('input', renderPreview);

headerUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if(file){
        const reader = new FileReader();
        reader.onload = () => {
            headerImage = reader.result;
            renderPreview();
        };
        reader.readAsDataURL(file);
    }
});

copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(preview.innerHTML).then(() => {
        copyBtn.innerText = "Copied!";
        setTimeout(() => copyBtn.innerText = "Copy HTML", 2000);
    });
});

renderPreview();