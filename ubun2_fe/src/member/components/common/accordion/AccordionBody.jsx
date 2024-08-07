import {useState} from "react";
import Phone from "@heroicons/react/24/solid/PhoneIcon.js"

const AccordionBody = ({customerName,customerPhone,customerEmail, customerAddress}) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const handleCall = () => {
        window.location.href = `tel:${customerPhone?.split("-").join("")}`;
    };

    return (
        <div id="accordion-flush" className="border-t border-gray-200 dark:border-gray-700">
            <h2 id="accordion-flush-heading-1">
                <button
                    type="button"
                    className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
                    onClick={() => toggleAccordion(1)}
                    aria-expanded={activeIndex === 1}
                    aria-controls="accordion-flush-body-1"
                >
                    <span>교환 및 반품 정보</span>
                    <svg data-accordion-icon className={`w-3 h-3 ${activeIndex === 1 ? 'rotate-180' : ''} shrink-0`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                    </svg>
                </button>
            </h2>
            <div id="accordion-flush-body-1" className={`${activeIndex === 1 ? '' : 'hidden'}`} aria-labelledby="accordion-flush-heading-1">
                <div className="py-5 border-b border-gray-200 dark:border-gray-700">

                    <div className="text-gray-500 dark:text-gray-400">
                        <div className="pb-3">
                            <h2 className="text-lg pb-3 text-main font-bold">교환 및 반품 가능 기간</h2>
                            <p>제품 수령일로부터 14일 이내에 교환 및 반품 신청이 가능합니다. 단, 제품이 손상되지 않고 원래 상태여야 합니다.</p>
                        </div>


                        <h2 className="text-lg py-3 text-main font-bold">교환 절차</h2>
                        <div className="flex flex-col gap-2">
                            <li><strong>고객센터 연락</strong>: 교환을 원하시는 경우, 고객센터로 연락해 주세요. (<a
                                href={`mailto:${customerEmail}`} className="text-blue-600">메일 보내기</a>)
                            </li>
                            <li><strong>교환 신청서 작성</strong>: 고객센터에서 제공하는 교환 신청서를 작성해 주세요.</li>
                            <li><strong>제품 반송</strong>: 교환 신청서와 함께 제품을 반송해 주세요. 반송 주소는 고객센터에서 안내해 드립니다.</li>
                            <li><strong>새 제품 발송</strong>: 반송된 제품이 확인되면, 새 제품을 발송해 드립니다.</li>
                        </div>

                        <h2 className="text-lg py-3 text-main font-bold">반품 절차</h2>
                        <div className="flex flex-col gap-2">
                            <li><strong>고객센터 연락</strong>: 반품을 원하시는 경우, 고객센터로 연락해 주세요. (<a
                                href={`mailto:${customerEmail}`} className="text-blue-600">메일 보내기</a>)
                            </li>
                            <li><strong>반품 신청서 작성</strong>: 고객센터에서 제공하는 반품 신청서를 작성해 주세요.</li>
                            <li><strong>제품 반송</strong>: 반품 신청서와 함께 제품을 반송해 주세요. 반송 주소는 고객센터에서 안내해 드립니다.</li>
                            <li><strong>환불 처리</strong>: 반송된 제품이 확인되면, 환불 처리를 진행해 드립니다. 환불 처리는 결제 수단에 따라 3-5 영업일이 소요될 수
                                있습니다.
                            </li>
                        </div>

                        <h2 className="text-lg py-3 text-main font-bold">교환 및 반품 시 유의 사항</h2>
                        <div>
                            <li>제품 및 포장 상태가 원래 상태와 다를 경우 교환 및 반품이 불가능할 수 있습니다.</li>
                            <li>교환 및 반품 배송비는 고객님의 부담입니다. 단, 제품 불량 및 오배송의 경우 당사가 부담합니다.</li>
                            <li>교환 및 반품 신청 전에 반드시 고객센터로 연락해 주시기 바랍니다.</li>
                        </div>

                        <p className="contact-info pt-3">고객님의 편리한 쇼핑을 위해 최선을 다하겠습니다. 감사합니다.</p>

                    </div>
                </div>
            </div>

            <h2 id="accordion-flush-heading-2">
                <button
                    type="button"
                    className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
                    onClick={() => toggleAccordion(2)}
                    aria-expanded={activeIndex === 2}
                    aria-controls="accordion-flush-body-2"
                >
                    <span>판매자 정보</span>
                    <svg data-accordion-icon className={`w-3 h-3 ${activeIndex === 2 ? 'rotate-180' : ''} shrink-0`}
                         aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M9 5 5 1 1 5"/>
                    </svg>
                </button>
            </h2>
            <div id="accordion-flush-body-2" className={`${activeIndex === 2 ? '' : 'hidden'}`}
                 aria-labelledby="accordion-flush-heading-2">
                <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col gap-2">
                        <li><span className="font-bold">판매자</span> : {customerName}</li>
                        <li><span className="font-bold">E-mail</span> : {customerEmail}</li>
                        <li><span className="font-bold">전화번호</span> : {customerPhone}</li>
                        <li><span className="font-bold">사업장 주소</span> : {`${customerAddress?.split(",").join(" ")}`}</li>
                    </div>
                </div>
            </div>

            <h2 id="accordion-flush-heading-3">
                <button
                    type="button"
                    className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
                    onClick={handleCall}
                    aria-expanded={activeIndex === 3}
                    aria-controls="accordion-flush-body-3"
                >
                    <div className="flex items-center gap-2">
                        <span>문의하기</span>
                        <Phone className="w-4 h-4"/>
                    </div>
                </button>
            </h2>
        </div>
    );
}
export default AccordionBody;