import * as Yup from 'yup';

const useShema = () => {
    const longLimit = 128;
    const shortLimit = 64;
    const requireMesg = 'Vui lòng nhập thông tin';
    const minMaxMesg = stringLenght => `Nhập tối đa ${stringLenght} kí tự`;

    let objectValidate = {
        contractCode: Yup.string()
            .required(requireMesg)
            .nullable(),
        customerName: Yup.string()
            .required(requireMesg)
            .max(shortLimit, minMaxMesg(shortLimit))
            .nullable(),
        // customerAddress: Yup.string()
        //     .max(longLimit, minMaxMesg(longLimit))
        //     .nullable()
    };
    // const shortGroup = ['customerIdCard', 'customerIdIssuePlace', 'partnerName', 'partnerIdCard', 'partnerIdIssuePlace', 'customerBankAccountNumber','customerPhone','customerEmail']
    // for (let index = 0; index < shortGroup.length; index++) {
    //     objectValidate[shortGroup[index]] = Yup.string().nullable().max(shortLimit, minMaxMesg(shortLimit));
    // }

    const schema = Yup.object().shape(objectValidate);
    return [schema];
}

export default useShema;