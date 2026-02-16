import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import MovieIcon from '@mui/icons-material/Movie';
import FlightIcon from '@mui/icons-material/Flight';
import './App.css';

const navItems = ['About me', 'History', 'Skills', 'Project', 'Contact'];

const scrollToSection = (sectionId) => {
  const el = document.getElementById(sectionId);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

function Navigation() {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: 'rgba(255,255,255,0.95)',
        borderBottom: '1px solid #eee',
        maxWidth: '1200px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
      }}
    >
      <Toolbar sx={{ justifyContent: 'center', gap: 4 }}>
        {navItems.map((item) => (
          <Button
            key={item}
            onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
            sx={{
              color: '#333',
              fontFamily: '"Playfair Display", serif',
              fontSize: '1rem',
              fontWeight: 500,
              letterSpacing: '0.05em',
              '&:hover': { color: '#9B8BB4', bgcolor: 'transparent' },
            }}
          >
            {item}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
}

function SectionTitle({ children }) {
  return (
    <Typography
      variant="h2"
      sx={{
        textAlign: 'center',
        mb: 5,
        color: '#5C4B7A',
        position: 'relative',
        '&::after': {
          content: '""',
          display: 'block',
          width: 60,
          height: 3,
          bgcolor: '#B8A9C9',
          margin: '12px auto 0',
          borderRadius: 2,
        },
      }}
    >
      {children}
    </Typography>
  );
}

function AboutMe() {
  return (
    <Box id="about-me" className="section section-about">
      <Container maxWidth="md">
        <SectionTitle>About Me</SectionTitle>

        {/* Profile area */}
        <Box className="about-profile-card">
          <Box className="about-profile-row">
            <Box className="profile-photo-placeholder">
              <Typography sx={{ color: '#B8A9C9', fontSize: '0.85rem' }}>PHOTO</Typography>
            </Box>
            <Box className="profile-info">
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                임여진 / 1997년생
              </Typography>
              <Typography variant="body2" sx={{ lineHeight: 2, color: '#555' }}>
                추구미는 여러여장뿐이지만 그렇지 못한편
                <br />
                비전공자 출신으로 뒤늦게 처음부터 새로 시작했지만
                <br />
                미래의 웹디자이너가 될 사람
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" sx={{ lineHeight: 2, color: '#555' }}>
                  호기심많은 예술가 ISFP
                  <br />
                  낯을 좀 가리지만 친해지면 재밌고 매력이 넘치는 성격
                  <br />
                  ISFP 지고 매나 싫싫 없편
                  <br />
                  일할때 튀어나오는 TJ 모먼트
                  <br />
                  빠르고 계획적으로 일처리하는 능력자
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* My Favorites */}
        <Box sx={{ mt: 5 }}>
          <Typography
            variant="h5"
            sx={{
              color: '#5C4B7A',
              mb: 3,
              fontFamily: '"Playfair Display", serif',
              letterSpacing: '0.1em',
            }}
          >
            MY FAVORITES
          </Typography>
          <Grid container spacing={3}>
            {[
              {
                icon: <SportsEsportsIcon sx={{ fontSize: 40, color: '#B8A9C9' }} />,
                title: 'GAME',
                desc: '친구들과 게임하거나\n쉬는날 집에서 혼자\n유튜브로 게임영상 보는걸\n게임영상 보는걸 좋아해요!',
              },
              {
                icon: <MovieIcon sx={{ fontSize: 40, color: '#B8A9C9' }} />,
                title: 'MOVIES',
                desc: '쉬는날 집에서 혼자\n영화보는걸 좋아해요!\n참여형이는 로맨틱러 시리즈',
              },
              {
                icon: <FlightIcon sx={{ fontSize: 40, color: '#B8A9C9' }} />,
                title: 'TRAVEL',
                desc: '가족이나 남자친구와 함께\n국내든 해외든 여행다니는걸\n좋아해요!',
              },
            ].map((item) => (
              <Grid size={{ xs: 12, sm: 4 }} key={item.title}>
                <Card className="favorite-card" elevation={0}>
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <Box className="favorite-icon-box">{item.icon}</Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mb: 1,
                        fontFamily: '"Playfair Display", serif',
                        color: '#5C4B7A',
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: '#666', whiteSpace: 'pre-line', lineHeight: 1.8 }}
                    >
                      {item.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

function History() {
  const leftItems = [
    {
      title: '송원대학교 뷰티예술학과 16학번',
      detail: '(2016.03~2020.02 졸업)',
    },
    {
      title: '국제수영대회 [FINA] 에서\n메이크업아티스트로 활동 & 수상자 메이크업 담당',
      detail: '(2019.07)',
    },
    {
      title: '아모레퍼시픽 특약점에서\n교육매니저(대리)로 근무',
      detail: '(2020.11~2025.04) 4년6개월',
    },
  ];
  const rightItems = [
    {
      title: '뷰티코디네이터',
      detail: '2017.04 CSM 아카데미 평생교육원',
    },
    {
      title: '미용사 (메이크업)\n2019.02 한국산업인력공단',
    },
    {
      title: '2종보통운전면허\n2019.12 경찰청',
    },
    {
      title: '바리스타1급\n2020.10 한국직업능력진흥원',
    },
    {
      title: '컴퓨터그래픽기능사 (취득예정)',
    },
    {
      title: '웹디자인개발기능사 (취득예정)',
    },
  ];

  return (
    <Box id="history" className="section section-history">
      <Container maxWidth="md">
        <SectionTitle>History</SectionTitle>
        <Box className="timeline-container">
          <Box className="timeline-line" />
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Box className="timeline-side timeline-left">
                {leftItems.map((item, i) => (
                  <Box key={i} className="timeline-item">
                    <Box className="timeline-dot" />
                    <Typography variant="body2" sx={{ fontWeight: 500, whiteSpace: 'pre-line' }}>
                      {item.title}
                    </Typography>
                    {item.detail && (
                      <Typography variant="caption" sx={{ color: '#888', display: 'block', mt: 0.5 }}>
                        {item.detail}
                      </Typography>
                    )}
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Box className="timeline-side timeline-right">
                {rightItems.map((item, i) => (
                  <Box key={i} className="timeline-item">
                    <Box className="timeline-dot" />
                    <Typography variant="body2" sx={{ fontWeight: 500, whiteSpace: 'pre-line' }}>
                      {item.title}
                    </Typography>
                    {item.detail && (
                      <Typography variant="caption" sx={{ color: '#888', display: 'block', mt: 0.5 }}>
                        {item.detail}
                      </Typography>
                    )}
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

function Skills() {
  const skills = [
    { name: 'PowerPoint', abbr: 'P', color: '#D04423', level: 80 },
    { name: 'Photoshop', abbr: 'Ps', color: '#31A8FF', level: 75 },
    { name: 'Excel', abbr: 'X', color: '#217346', level: 70 },
    { name: 'Illustrator', abbr: 'Ai', color: '#FF9A00', level: 65 },
    { name: 'Word', abbr: 'W', color: '#2B579A', level: 60 },
  ];

  return (
    <Box id="skills" className="section section-skills">
      <Container maxWidth="md">
        <SectionTitle>Skills</SectionTitle>
        <Box className="skills-card">
          <Grid container spacing={3}>
            {skills.map((skill) => (
              <Grid size={{ xs: 12, sm: 6 }} key={skill.name}>
                <Box className="skill-row">
                  <Box
                    className="skill-icon"
                    sx={{ bgcolor: skill.color, color: 'white' }}
                  >
                    <Typography sx={{ fontWeight: 700, fontSize: '0.75rem' }}>
                      {skill.abbr}
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <FavoriteIcon sx={{ fontSize: 16, color: '#E8B4C8' }} />
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {skill.name}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={skill.level}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: '#E8E0F0',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 4,
                          bgcolor: '#B8A9C9',
                        },
                      }}
                    />
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

function Project() {
  const projects = [
    {
      logo: 'Gong cha',
      title: '공차 카페 홈페이지 리디자인',
      tool: '사용툴 - Ps',
      align: 'left',
    },
    {
      logo: 'Jasminbell',
      title: '자스민벨 쇼핑몰 홈페이지 리디자인',
      tool: '사용툴 - Ps',
      align: 'right',
    },
  ];

  return (
    <Box id="project" className="section section-project">
      <Container maxWidth="md">
        <SectionTitle>Project</SectionTitle>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {projects.map((project, i) => (
            <Box
              key={i}
              className="project-row"
              sx={{
                flexDirection: project.align === 'right' ? 'row-reverse' : 'row',
              }}
            >
              <Box className="project-logo-box">
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    color: '#5C4B7A',
                    fontFamily: '"Playfair Display", serif',
                  }}
                >
                  {project.logo}
                </Typography>
              </Box>
              <Box className="project-info">
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                  {project.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#888' }}>
                  {project.tool}
                </Typography>
              </Box>
              <Box className="project-preview-box">
                <Typography sx={{ color: '#ccc', fontSize: '0.8rem' }}>Preview</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

function Contact() {
  return (
    <Box id="contact" className="section section-contact">
      <Container maxWidth="md">
        <SectionTitle>Contact</SectionTitle>
        <Box sx={{ textAlign: 'center' }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1.5,
              bgcolor: 'white',
              px: 4,
              py: 2,
              borderRadius: 3,
              boxShadow: '0 2px 12px rgba(156,139,180,0.15)',
            }}
          >
            <EmailIcon sx={{ color: '#9B8BB4' }} />
            <Typography variant="body1" sx={{ color: '#555' }}>
              wlsdlgnsdl97@naver.com
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

function Footer() {
  return (
    <Box
      className="footer-section"
      sx={{
        bgcolor: '#5C4B7A',
        color: 'white',
        py: 3,
        textAlign: 'center',
      }}
    >
      <Typography variant="body2" sx={{ opacity: 0.8 }}>
        &copy; 2025 YJ Portfolio. All rights reserved.
      </Typography>
    </Box>
  );
}

function App() {
  return (
    <Box>
      <Navigation />
      <AboutMe />
      <History />
      <Skills />
      <Project />
      <Contact />
      <Footer />
    </Box>
  );
}

export default App;
