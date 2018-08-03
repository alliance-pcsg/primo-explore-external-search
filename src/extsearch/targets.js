import { worldcat } from './mappings'

export default {
    worldcat (queries, filters) {
        try {
            return 'queryString=' + queries.map(part => {
                let terms = part.split(',')
                let type = worldcat[terms[0]] || 'kw'
                let string = terms[2] || ''
                let join = terms[3] || ''
                return type + ':' + string + ' ' + join + ' '
            }).join('')
        } catch (e) {
            return ''
        }
    },

    gscholar (queries, filters) {
        try {
            return queries.map(part => part.split(',')[2] || '').join(' ')
        } catch (e) {
            return ''
        }
    },
}
