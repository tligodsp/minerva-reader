import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Reader } from '../../components/common/organisms';
import { LocalBook } from '../../types';
import * as Local from '../../utils/localUtils';

const ReaderPage = () => {
  let { id } = useParams();
  const [localBook, setLocalBook] = useState<LocalBook>();

  useEffect(() => {
    if (id) {
      Local.getLocalBookById(id)
          .then((response: any) => {
            setLocalBook(response.localBook);
          })
          .catch(err => {
            console.log(err);
          })
    }
    else {
      // TODO: Redirect
    }
  }, []);

  return (
    <div>
      {
        localBook &&
        <Reader localBook={localBook}/>
      }
    </div>
  );
}

export default ReaderPage;
