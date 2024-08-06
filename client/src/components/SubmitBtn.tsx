

interface Props {
  text: string,
  disabled: boolean
}

const SubmitBtn = ({ text, disabled }: Props) => {

  return (
    <button
      type='submit'
      className='btn btn-primary btn-block'
      disabled={disabled}
    >
      {disabled ? (
        <>
          <span className='loading loading-spinner'></span>
          sending...
        </>
      ) : (
        text || 'submit'
      )}
    </button>
  );
};
export default SubmitBtn;