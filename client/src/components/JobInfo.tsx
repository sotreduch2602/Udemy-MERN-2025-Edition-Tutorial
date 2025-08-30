import Wrapper from "../assets/wrappers/JobInfo";

interface JobInfoProps {
  icon: React.ReactNode;
  text: string;
}

const JobInfo = ({ icon, text }: JobInfoProps) => {
  return (
    <Wrapper>
      <span className="job-icon">{icon}</span>
      <span className="job-text">{text}</span>
    </Wrapper>
  );
};

export default JobInfo;
