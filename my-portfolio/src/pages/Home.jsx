import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SectionBox from '../components/SectionBox';

export default function Home() {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Hero */}
      <SectionBox
        title="WELCOME"
        description="여기는 Hero 섹션입니다. 메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다."
        background="linear-gradient(180deg, #E8E0F0 0%, #F8F5FC 100%)"
      />

      {/* About Me */}
      <SectionBox
        title="ABOUT ME"
        description="여기는 About Me 섹션입니다. 간단한 자기소개와 '더 알아보기' 버튼이 들어갈 예정입니다."
        background="var(--color-bg-primary)"
      >
        <Box sx={{ mt: 3 }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/about')}
            sx={{
              color: 'var(--color-button-primary)',
              borderColor: 'var(--color-button-primary)',
              borderRadius: 8,
              px: 4,
              '&:hover': {
                bgcolor: 'var(--color-button-hover)',
                borderColor: 'var(--color-button-hover)',
                color: 'white',
              },
            }}
          >
            더 알아보기
          </Button>
        </Box>
      </SectionBox>

      {/* Skill Tree */}
      <SectionBox
        title="SKILL TREE"
        description="여기는 Skill Tree 섹션입니다. 기술 스택을 트리나 프로그레스바로 시각화할 예정입니다."
        background="linear-gradient(180deg, #E8EDF5 0%, #F0EDF7 100%)"
      />

      {/* Projects */}
      <SectionBox
        title="PROJECTS"
        description="여기는 Projects 섹션입니다. 대표작 썸네일 3-4개와 '더 보기' 버튼이 들어갈 예정입니다."
        background="var(--color-bg-primary)"
      >
        <Box sx={{ mt: 3 }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/projects')}
            sx={{
              color: 'var(--color-button-primary)',
              borderColor: 'var(--color-button-primary)',
              borderRadius: 8,
              px: 4,
              '&:hover': {
                bgcolor: 'var(--color-button-hover)',
                borderColor: 'var(--color-button-hover)',
                color: 'white',
              },
            }}
          >
            더 보기
          </Button>
        </Box>
      </SectionBox>

      {/* Contact */}
      <SectionBox
        title="CONTACT"
        description="여기는 Contact 섹션입니다. 연락처, SNS, 간단한 메시지 폼이 들어갈 예정입니다."
        background="linear-gradient(180deg, #F0EDF7 0%, #E8E0F0 100%)"
      />
    </Box>
  );
}
