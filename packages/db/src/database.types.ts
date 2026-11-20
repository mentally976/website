// Mirrors supabase/migrations. Regenerate from the live project with `pnpm db:types`.
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

type Table<Row, Required extends keyof Row> = {
  Row: Row
  Insert: Pick<Row, Required> & Partial<Omit<Row, Required>>
  Update: Partial<Row>
  Relationships: []
}

export type Database = {
  public: {
    Tables: {
      profiles: Table<
        { id: string; full_name: string | null; avatar_url: string | null; created_at: string; updated_at: string },
        'id'
      >
      categories: Table<{ id: string; slug: string; name: string; position: number }, 'slug' | 'name'>
      therapists: Table<
        {
          id: string
          slug: string
          name: string
          title: string
          bio: string
          photo_url: string | null
          specialties: string[]
          years_experience: number
          created_at: string
        },
        'slug' | 'name' | 'title'
      >
      courses: Table<
        {
          id: string
          slug: string
          title: string
          summary: string
          description: string
          cover_url: string | null
          category_id: string | null
          therapist_id: string | null
          level: Database['public']['Enums']['course_level']
          outcomes: string[]
          is_published: boolean
          published_at: string | null
          created_at: string
        },
        'slug' | 'title'
      >
      lessons: Table<
        {
          id: string
          course_id: string
          position: number
          title: string
          summary: string
          duration_seconds: number
          video_path: string | null
          is_free_preview: boolean
          created_at: string
        },
        'course_id' | 'position' | 'title'
      >
      enrollments: Table<{ user_id: string; course_id: string; created_at: string }, 'user_id' | 'course_id'>
      lesson_progress: Table<
        {
          user_id: string
          lesson_id: string
          position_seconds: number
          completed_at: string | null
          updated_at: string
        },
        'user_id' | 'lesson_id'
      >
    }
    Views: { [_ in never]: never }
    Functions: { [_ in never]: never }
    Enums: { course_level: 'beginner' | 'intermediate' | 'advanced' }
    CompositeTypes: { [_ in never]: never }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]
