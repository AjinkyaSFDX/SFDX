import { LightningElement } from 'lwc';

export default class CallFromFlow extends LightningElement {

    connectedCallback(){
        this.differenceBetweenDates();
    }
    differenceBetweenDates(){
        const daysInMonth = {
            1: 31,
            2: 28, // 29 in leap years
            3: 31,
            4: 30,
            5: 31,
            6: 30,
            7: 31,
            8: 31,
            9: 30,
            10: 31,
            11: 30,
            12: 31,
          };

        const oneDate = new Date("2021-03-25");
        const secondDate = new Date("2022-04-21");

        const localeOneDateString = oneDate.toLocaleString();
        const localeSecondDateString = secondDate.toLocaleString();

        const oneDateArray = localeOneDateString.split(', ')[0].split('/');
        const secondDateArray = localeSecondDateString.split(', ')[0].split('/');

        const diffInDays = secondDateArray[0] - oneDateArray[0];
        const diffInMonths = secondDateArray[1] - oneDateArray[1];
        const diffInYears = secondDateArray[2] - oneDateArray[2];

        console.log(diffInDays);
        console.log(diffInMonths);
        console.log(diffInYears);

        if(diffInYears != 0){
            const yearDays = diffInYears * 365;
        }
        if(diffInMonths != 0){
            const oneDayMonth = oneDateArray[1];
            for(i = 0; i <= oneDayMonth; i++){
                
            }
            const monthDays = diffInMonths * daysInMonth.get();
        }
        
    }

}