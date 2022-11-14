import React from 'react';
import LastMovieInDb from './LastMovieInDb';
import LastUserInDB from './LastUserInDB';

function ContentRowCenter(){
    return (
        <div className="row">
            
            {/*<!-- Last Movie in DB -->*/}
            <LastMovieInDb />
            {/*<!-- End content row last movie in Data Base -->*/}

            {/*<!-- Genres in DB -->*/}
            <LastUserInDB />

        </div>
    )
}

export default ContentRowCenter;