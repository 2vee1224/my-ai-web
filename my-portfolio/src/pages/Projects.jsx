import { Box, Container, Typography, Card, CardMedia, CardContent, CardActions, Button, Chip } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const projects = [
  {
    id: 1,
    title: '공차 카페 홈페이지 리디자인',
    description:
      '공차 코리아 공식 홈페이지를 리디자인했습니다.\n무한 배너 슬라이더, 드롭다운 네비게이션, 멤버십·매장 섹션, SNS 연동 등 인터랙티브한 UI를 구현했습니다.',
    tags: ['HTML', 'CSS', 'JavaScript', 'UI/UX'],
    link: 'https://2vee1224.github.io/gongcha-redesign/',
    image: '/gongcha-thumb.jpg',
  },
  {
    id: 2,
    title: '자스민벨 쇼핑몰 홈페이지 리디자인',
    description:
      '여성 쇼핑몰 자스민벨의 메인·서브 페이지를 리디자인했습니다.\n배너 슬라이더, 상품 이미지 자동 순환, 이달의 BEST TOP 5 등 다양한 인터랙션을 구현했습니다.',
    tags: ['HTML', 'CSS', 'JavaScript', 'UI/UX'],
    link: 'https://2vee1224.github.io/jasminbell-redesign/',
    image: null,
  },
];

export default function Projects() {
  return (
    <Box
      sx={{
        background: 'linear-gradient(180deg, #E8EDF5 0%, #F0EDF7 100%)',
        minHeight: 'calc(100vh - 64px)',
        py: { xs: 6, md: 10 },
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
            mb: 2,
            color: 'var(--color-primary-dark)',
            '&::after': {
              content: '""',
              display: 'block',
              width: 50,
              height: 3,
              bgcolor: 'var(--color-primary-light)',
              margin: '12px auto 0',
              borderRadius: 2,
            },
          }}
        >
          Projects
        </Typography>

        <Box sx={{ mt: 5, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {projects.map((project) => (
            <Card
              key={project.id}
              sx={{
                bgcolor: 'var(--color-bg-primary)',
                borderRadius: 3,
                border: '1px solid var(--color-border)',
                boxShadow: '0 4px 20px var(--color-shadow)',
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                overflow: 'hidden',
              }}
            >
              {/* 번호 배지 */}
              <Box
                sx={{
                  minWidth: { sm: 80 },
                  bgcolor: 'var(--color-primary-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  py: { xs: 2, sm: 0 },
                }}
              >
                <Typography
                  sx={{
                    fontSize: '2rem',
                    fontWeight: 700,
                    color: 'white',
                    lineHeight: 1,
                  }}
                >
                  {String(project.id).padStart(2, '0')}
                </Typography>
              </Box>

              {/* 썸네일 */}
              {project.image && (
                <CardMedia
                  component="img"
                  image={project.image}
                  alt={project.title}
                  sx={{
                    width: { xs: '100%', sm: 220 },
                    height: { xs: 160, sm: 'auto' },
                    objectFit: 'cover',
                    flexShrink: 0,
                  }}
                />
              )}

              {/* 내용 */}
              <Box sx={{ flex: 1, p: { xs: 3, md: 4 } }}>
                <CardContent sx={{ p: 0 }}>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, mb: 1.5, color: 'var(--color-text-primary)' }}
                  >
                    {project.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'var(--color-text-secondary)',
                      lineHeight: 2,
                      whiteSpace: 'pre-line',
                      mb: 2,
                    }}
                  >
                    {project.description}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {project.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        sx={{
                          bgcolor: 'var(--color-primary-light)',
                          color: 'white',
                          fontWeight: 600,
                          fontSize: '0.72rem',
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>

                {project.link && (
                  <CardActions sx={{ p: 0, mt: 3 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      endIcon={<OpenInNewIcon />}
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: 'var(--color-button-primary)',
                        borderColor: 'var(--color-button-primary)',
                        borderRadius: 8,
                        px: 3,
                        '&:hover': {
                          bgcolor: 'var(--color-button-hover)',
                          borderColor: 'var(--color-button-hover)',
                          color: 'white',
                        },
                      }}
                    >
                      사이트 보기
                    </Button>
                  </CardActions>
                )}
              </Box>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
