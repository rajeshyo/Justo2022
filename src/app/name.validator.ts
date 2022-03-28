import { AbstractControl, ValidationErrors,FormControl } from '@angular/forms';
  
export class NameValidator {
    static noWhiteSpace(control: FormControl) : ValidationErrors | null {
        if((control.value as string).indexOf(' ') >= 0){
            return {noWhiteSpace: true}
        }
        return null;
    }
}