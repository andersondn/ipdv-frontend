import { useCallback } from "react"
import { useState } from "react"
import { Cost } from "../types/costTypes";


const useCostsFilter = (entrada: any): [a: Cost[], b: Function] => {
    const [filters, setFilters] = useState<any>({})
    const setFilter = useCallback((i) => {
        setFilters((f: any) => ({ ...f, ...i }));
    }, []);

    function costFilter(cost: Cost): Boolean {
        const { search, department, user } = filters
        let result = true;
        if (search) {
            result = cost.title.toLowerCase().search(search.toLowerCase()) >= 0 ||
                     cost.user_name.toLowerCase().search(search.toLowerCase()) >= 0 ||
                    cost.department_title.toLowerCase().search(search.toLowerCase()) >= 0
        }
        if (department) {
            result = department === cost.department_id && result
        }

        if (user) {
            result = user === cost.user_id && result
        }
        return result;

    }
    const filteredData = entrada? entrada.filter(costFilter) : []
    return [filteredData, setFilter]
}

export default useCostsFilter