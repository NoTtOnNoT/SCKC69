/**
 * ฟังก์ชันหลักสำหรับการเริ่มต้นการทำงานของหน้าเว็บ
 */
function initVoterPage() {
    const sections = document.querySelectorAll('.snap-section');
    
    // ตั้งค่าตัวตรวจจับตำแหน่งการเลื่อน (Intersection Observer)
    const observerOptions = {
        threshold: 0.25 // เริ่มแสดงผลเมื่อหน้าจอเลื่อนเข้ามา 25%
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // เพิ่มคลาสเพื่อสั่งให้ Animation ทำงาน
                entry.target.classList.add('is-visible');
            } else {
                // เอาคลาสออกเพื่อให้สามารถแสดงซ้ำได้เมื่อเลื่อนกลับมา
                entry.target.classList.remove('is-visible');
            }
        });
    }, observerOptions);

    // สั่งให้ตัวตรวจจับทำงานกับทุก Section
    sections.forEach(section => {
        observer.observe(section);
    });

    // บังคับให้หน้าเว็บกลับไปด้านบนสุดเสมอเมื่อเปิดใหม่
    const scrollContainer = document.getElementById('main-scroll');
    if (scrollContainer) {
        scrollContainer.scrollTop = 0;
    }
}

/**
 * ป้องกันปัญหา "ต้องรีเฟรชหน้าจอ" โดยการตรวจจับสถานะการโหลด
 */
if (document.readyState === 'loading') {
    // ถ้ายังโหลดไม่เสร็จ ให้รอจนกว่า DOM จะพร้อม
    document.addEventListener('DOMContentLoaded', initVoterPage);
} else {
    // ถ้าโหลดเสร็จแล้ว (เช่น กรณีเรียกจาก Cache) ให้รันทันที
    initVoterPage();
}

// แก้ปัญหาบั๊กการคำนวณขนาดหน้าจอบน Safari/Mobile
window.addEventListener('resize', () => {
    window.dispatchEvent(new Event('scroll'));
});