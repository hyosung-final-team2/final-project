const NoDataTable = ({text, buttonText, buttonFunc, colNum}) => {
    return (
        <tbody>
            <tr>
                <td colSpan={colNum + 1} className="text-center">
                    <div className="py-[15%]">
                        <div className="text-xl font-bold text-main mb-4">{text}</div>
                        <button onClick={() => buttonFunc()} className="px-8 py-4 bg-main rounded-xl text-white ">{buttonText}</button>
                    </div>
                </td>
            </tr>
        </tbody>
    )
}
export default NoDataTable