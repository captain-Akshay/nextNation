import Link from "next/link";
import { useTheme } from 'next-themes';

interface FormProps {
  type: string;
  post: any;
  setPost: any;
  submitting: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const Form: React.FC<FormProps> = ({ type, post, setPost, submitting, handleSubmit }) => {
  const { theme,setTheme } = useTheme();
  if (typeof window !== 'undefined') {
    setTheme(window.localStorage.getItem("theme")??"light");
  }else{
    setTheme("light")
  }
  const isDarkTheme = theme === 'dark';

  const getGradientStyle = () => {
    if (isDarkTheme) {
      return 'bg-gradient-to-r from-purple-900 to-blue-800';
    } else {
      return 'bg-gradient-to-r from-blue-400 to-purple-600';
    }
  };

  return (
    <section className={`w-full max-w-full flex-start flex-col mt-14 ${getGradientStyle()} p-10 rounded-xl`}>
      <h1 className={`head_text text-left ${isDarkTheme ? 'text-white' : 'text-black'}`}>
        <span className='blue_gradient text-3xl font-bold'>{type} Post</span>
      </h1>
      <p className={`desc text-left max-w-md text-lg ${isDarkTheme ? 'text-white' : 'text-black'}`}>
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform
      </p>

      <form
        onSubmit={handleSubmit}
        className={`mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism p-6 rounded-lg ${isDarkTheme ? 'bg-opacity-70' : 'bg-opacity-20'} backdrop-blur-xl`}
      >
<label className="flex flex-col"> {/* Add the flex and flex-col classes here */}
  <span className={`font-satoshi font-semibold text-base ${isDarkTheme ? 'text-white' : 'text-black'}`}>
    Your AI Prompt
  </span>

  <textarea
    value={post.prompt}
    onChange={(e) => setPost({ ...post, prompt: e.target.value })}
    placeholder='Write your post here'
    required
    className={`form_textarea ${isDarkTheme ? 'bg-white bg-opacity-20' : 'bg-white bg-opacity-70'} rounded-lg p-2 focus:outline-none`}
  />
</label>

        <label>
          <span className={`font-satoshi font-semibold text-base ${isDarkTheme ? 'text-white' : 'text-black'}`}>
            Field of Prompt{" "}
            <span className={`font-normal ${isDarkTheme ? 'text-white' : 'text-black'}`}>
              (#product, #webdevelopment, #idea, etc.)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            type='text'
            placeholder='#Tag'
            required
            className={`form_input ${isDarkTheme ? 'bg-white bg-opacity-20' : 'bg-white bg-opacity-70'} rounded-lg p-2 focus:outline-none`}
          />
        </label>

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className={`text-gray-500 text-sm ${isDarkTheme ? 'text-white' : 'text-black'}`}>
            Cancel
          </Link>

          <button
            type='submit'
            disabled={submitting}
            className={`px-5 py-2 text-sm bg-primary-orange rounded-full text-white font-semibold disabled:opacity-50 ${isDarkTheme ? 'bg-opacity-90' : 'bg-opacity-100'}`}
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
