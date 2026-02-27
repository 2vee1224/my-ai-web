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
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import './App.css';

const navItems = ['About me', 'History', 'Skills', 'Project', 'Contect'];

const scrollToSection = (sectionId) => {
  const el = document.getElementById(sectionId);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

function Navigation() {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      className="nav-bar"
      sx={{
        bgcolor: 'rgba(255,255,255,0.95)',
        borderBottom: '1px solid #eee',
        maxWidth: '1200px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
      }}
    >
      <Toolbar className="nav-toolbar" sx={{ justifyContent: 'center', gap: 4, minHeight: '48px !important' }}>
        {navItems.map((item) => (
          <Button
            key={item}
            onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
            className="nav-button"
            sx={{
              color: '#333',
              fontFamily: '"Playfair Display", serif',
              fontSize: '0.95rem',
              fontWeight: 500,
              letterSpacing: '0.05em',
              py: 0.5,
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
      variant="h4"
      className="section-title"
      sx={{
        textAlign: 'center',
        mb: 2.5,
        color: '#5C4B7A',
        fontFamily: '"Playfair Display", serif',
        fontWeight: 700,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
      }}
    >
      {children}
    </Typography>
  );
}

function AboutMe() {
  return (
    <Box id="about-me" className="page page-1">
      <Box className="page-inner" sx={{ pt: '56px' }}>
        <Container maxWidth="md">
          <SectionTitle>About Me</SectionTitle>

          {/* Profile area */}
          <Box className="about-profile-card">
            <Box sx={{ textAlign: 'center', mb: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                임여진 <Typography component="span" sx={{ fontWeight: 400, color: '#888' }}>/ Limyeojin</Typography>
              </Typography>
              <Typography variant="body2" sx={{ color: '#888' }}>
                1997 . 12 . 24
              </Typography>
            </Box>
            <Box className="about-profile-row">
              <Box className="profile-photo-placeholder">
                <Typography sx={{ color: '#B8A9C9', fontSize: '0.85rem' }}>PHOTO</Typography>
              </Box>
              <Box className="profile-info">
                <Typography variant="body2" sx={{ lineHeight: 1.8, color: '#555', textAlign: 'center', mb: 1.5 }}>
                  추구미는 여리여리함🎀이지만 그렇지 못한편
                  <br />
                  비전공자 출신으로 뒤늦게 처음부터 새로 시작했지만
                  <br />
                  미래의 <strong>웹디자이너</strong>가 될 사람 😋
                </Typography>
                <Box className="personality-columns">
                  {[
                    ['호기심많은 예술가', 'ISFP'],
                    ['낯을 좀 가리지만 친해지면', '재밌고 배려심 넘치는 성격'],
                    ['ISFP 치고 꽤나', '성실✊한편'],
                    ['일할때 튀어나오는', 'TJ 모먼트'],
                  ].map(([left, right], i) => (
                    <Box key={i} className="personality-pair">
                      <Typography component="span" variant="body2" className="p-left" sx={{ lineHeight: 2, color: '#555' }}>
                        {left}
                      </Typography>
                      <Typography component="span" variant="body2" className="p-right" sx={{ lineHeight: 2, color: '#9B8BB4', fontWeight: 500 }}>
                        {right}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                <Box sx={{ mt: 1.5, textAlign: 'center' }}>
                  <Box
                    component="span"
                    sx={{
                      color: '#fff',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      backgroundColor: '#cfd5e3',
                      borderRadius: '6px',
                      padding: '5px 16px',
                      display: 'inline',
                      lineHeight: 2.2,
                    }}
                  >
                    빠르고 계획적으로 일처리하는 능력자✌
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* My Favorites */}
          <Box sx={{ mt: 2.5 }}>
            <Typography
              variant="h6"
              sx={{
                color: '#5C4B7A',
                mb: 1.5,
                fontFamily: '"Playfair Display", serif',
                letterSpacing: '0.1em',
              }}
            >
              MY FAVORITES
            </Typography>
            <Grid container spacing={2}>
              {[
                {
                  icon: <SportsEsportsIcon sx={{ fontSize: 36, color: '#B8A9C9' }} />,
                  title: 'GAME',
                  desc: '친구들과 게임하거나\n유튜브로 게임영상 보는걸\n좋아해요! 🎮',
                },
                {
                  icon: <MovieIcon sx={{ fontSize: 36, color: '#B8A9C9' }} />,
                  title: 'MOVIES',
                  desc: '쉬는날 집에서 혼자\n영화보는걸 좋아해요!\n최애영화는 트와일라잇 시리즈💗',
                },
                {
                  icon: <FlightIcon sx={{ fontSize: 36, color: '#B8A9C9' }} />,
                  title: 'TRAVEL',
                  desc: '국내든 해외든 여행다니는걸\n좋아해요! ✈️',
                },
              ].map((item) => (
                <Grid size={{ xs: 12, sm: 4 }} key={item.title}>
                  <Card className="favorite-card" elevation={0}>
                    <CardContent sx={{ textAlign: 'center', p: 2 }}>
                      <Box className="favorite-icon-box">{item.icon}</Box>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 700,
                          mb: 0.5,
                          fontFamily: '"Playfair Display", serif',
                          color: '#5C4B7A',
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: '#666', whiteSpace: 'pre-line', lineHeight: 1.6, display: 'block' }}
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
    </Box>
  );
}

function HistoryAndSkills() {
  const leftItems = [
    {
      title: '송원대학교 뷰티예술학과 16학번',
      detail: '( 2016.03~2020.02 졸업)',
    },
    {
      title: '국제수영연맹 [FINA] 에서\n메이크업아티스트로써 특수분장 자원봉사',
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
      title: '미용사 (메이크업)',
      detail: '2019.02 한국산업인력공단',
    },
    {
      title: '2종보통운전면허',
      detail: '2019.12 경찰청',
    },
    {
      title: '컴퓨터그래픽기능사 (취득예정)',
    },
    {
      title: '웹디자인개발기능사 (취득예정)',
    },
  ];

  const skills = [
    { name: 'PowerPoint', abbr: 'P', color: '#D04423', level: 80 },
    { name: 'Photoshop', abbr: 'Ps', color: '#31A8FF', level: 75 },
    { name: 'Excel', abbr: 'X', color: '#217346', level: 70 },
    { name: 'Illustrator', abbr: 'Ai', color: '#FF9A00', level: 65 },
    { name: 'Word', abbr: 'W', color: '#2B579A', level: 60 },
    { name: 'VS Code', abbr: 'VS', color: '#007ACC', level: 55 },
  ];

  return (
    <Box id="history" className="page page-2">
      {/* History - 3/5 */}
      <Box className="page-2-history">
        <Container maxWidth="md">
          <SectionTitle>History</SectionTitle>
          <Box className="timeline-container">
            <Box className="timeline-line" />
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Box className="timeline-side timeline-left">
                  {leftItems.map((item, i) => (
                    <Box key={i} className="timeline-item">
                      <Box className="timeline-dot" />
                      <Typography variant="body2" sx={{ fontWeight: 500, whiteSpace: 'pre-line', fontSize: '0.8rem' }}>
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
                      <Typography variant="body2" sx={{ fontWeight: 500, whiteSpace: 'pre-line', fontSize: '0.8rem' }}>
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

      {/* Skills - 2/5 */}
      <Box id="skills" className="page-2-skills">
        <Container maxWidth="md">
          <SectionTitle>Skills</SectionTitle>
          <Box className="skills-card">
            <Grid container spacing={2}>
              {skills.map((skill) => (
                <Grid size={{ xs: 6, sm: 6 }} key={skill.name}>
                  <Box className="skill-row">
                    <Box
                      className="skill-icon"
                      sx={{ bgcolor: skill.color, color: 'white' }}
                    >
                      <Typography sx={{ fontWeight: 700, fontSize: '0.7rem' }}>
                        {skill.abbr}
                      </Typography>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <FavoriteIcon sx={{ fontSize: 14, color: '#E8B4C8' }} />
                        <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.8rem' }}>
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
    </Box>
  );
}

function ProjectAndContact() {
  const projects = [
    {
      title: '공차 카페 홈페이지 리디자인',
      tool: '사용툴 : Ps, VS Code, Claude Ai',
      detail: '기여도 100%\n기획 3일 / 작업 4주 소요',
    },
    {
      title: '자스민벨 쇼핑몰 홈페이지 리디자인',
      tool: '사용툴 : Ps, VS Code, Claude Ai',
      detail: '기여도 100%\n기획 3일 / 작업 4주 소요',
    },
    {
      title: 'Game Hub - 게임 커뮤니티',
      tool: '사용툴 : React · Vite · MUI, VS Code, Claude Ai',
      detail: '기여도 100%\n기획 1일 / 작업 1일 소요',
      url: 'https://2vee1224.github.io/my-ai-web/lecture1/',
      previewBg: 'linear-gradient(135deg, #1a1a2e, #16213e)',
      previewIcon: <SportsEsportsIcon sx={{ fontSize: 40, color: '#4ECDC4' }} />,
      previewLabel: 'Game Hub',
    },
    {
      title: 'Travel Log - 여행 SNS',
      tool: '사용툴 : React · Vite · MUI · Supabase, VS Code, Claude Ai',
      detail: '기여도 100%\n기획 1일 / 작업 1일 소요',
      url: 'https://2vee1224.github.io/my-ai-web/lecture1/mini_sns/',
      previewBg: 'linear-gradient(135deg, #87CEEB, #98FB98)',
      previewIcon: <FlightTakeoffIcon sx={{ fontSize: 40, color: '#fff' }} />,
      previewLabel: 'Travel Log',
    },
  ];

  return (
    <Box id="project" className="page page-3">
      {/* Project - 8.5/10 */}
      <Box className="page-3-project">
        <Container maxWidth="md">
          <SectionTitle>Project</SectionTitle>
          <Grid container spacing={3}>
            {projects.map((project, i) => (
              <Grid size={{ xs: 12, sm: 6 }} key={i}>
                <Box
                  sx={{
                    borderRadius: '12px',
                    border: '1px solid #E8E0F0',
                    background: '#FDFCFE',
                    overflow: 'hidden',
                    transition: 'box-shadow 0.3s',
                    height: '100%',
                    cursor: project.url ? 'pointer' : 'default',
                    '&:hover': { boxShadow: '0 4px 16px rgba(156,139,180,0.15)' },
                  }}
                  onClick={ () => project.url && window.open(project.url, '_blank') }
                >
                  {/* 미리보기 */}
                  <Box
                    sx={{
                      width: '100%',
                      height: 130,
                      background: project.previewBg || 'linear-gradient(135deg, #E8E0F0, #D0C4E0)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 0.5,
                    }}
                  >
                    { project.previewIcon ? (
                      <>
                        { project.previewIcon }
                        <Typography sx={{ color: '#fff', fontSize: '0.75rem', fontWeight: 700 }}>
                          { project.previewLabel }
                        </Typography>
                      </>
                    ) : (
                      <Typography sx={{ color: '#ccc', fontSize: '0.8rem' }}>Preview</Typography>
                    ) }
                  </Box>

                  {/* 정보 */}
                  <Box sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {project.title}
                      </Typography>
                      { project.url && <OpenInNewIcon sx={{ fontSize: 14, color: '#B8A9C9' }} /> }
                    </Box>
                    <Typography variant="body2" sx={{ color: '#888' }}>
                      {project.tool}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#999', whiteSpace: 'pre-line', mt: 0.5, display: 'block' }}>
                      {project.detail}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Contect - 1.5/10 */}
      <Box id="contect" className="page-3-contact">
        <Container maxWidth="md">
          <SectionTitle>Contect</SectionTitle>
          <Box sx={{ textAlign: 'center' }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1.5,
                bgcolor: 'white',
                px: 4,
                py: 1,
                borderRadius: 3,
                boxShadow: '0 2px 12px rgba(156,139,180,0.15)',
              }}
            >
              <EmailIcon sx={{ color: '#9B8BB4' }} />
              <Typography variant="body2" sx={{ color: '#555' }}>
                wlsdlgnsdl97@naver.com
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <Box>
      <Navigation />
      <AboutMe />
      <HistoryAndSkills />
      <ProjectAndContact />
    </Box>
  );
}

export default App;
