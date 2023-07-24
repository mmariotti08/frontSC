const validation = (data, error, setError)=>{

    const errors = {}
/// street
    if(!data.street){
        errors.street = 'The street field is required.';
      } else {
        errors.street = '';
      }

/// country
    if(!data.country){
        errors.country = 'The country field is required.';
      } else {
        errors.country = '';
      }

/// city
    if(!data.city){
        errors.city = 'The city field is required.';
      } else {
        errors.city = '';
      }

/// postalCode
    if(!data.postalCode){
        errors.postalCode = 'The postal code field is required.';
      } else if (!/^[0-9]+$/.test(data.postalCode)) {
        errors.postalCode = 'Must be numeric only';
      } else {
        errors.postalCode = '';
      }

      setError(errors)
}
export default validation;