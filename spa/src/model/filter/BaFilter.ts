import MasterFilter from './master/MasterFilter';
import {DateRank} from '../../utils/dateTime';

class BaFilter extends MasterFilter {
    dobPeriod: DateRank = {from: '', to: ''};
}

export default BaFilter;
