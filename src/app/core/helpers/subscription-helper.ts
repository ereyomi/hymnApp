import { Subscription } from 'rxjs';

export const unsubscriberHelper = (subscription: any) => {
    if (subscription && subscription instanceof Subscription) {
        subscription.unsubscribe();
    }
};
