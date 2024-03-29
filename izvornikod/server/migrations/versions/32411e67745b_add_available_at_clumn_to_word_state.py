"""Add available_at clumn to WORD_STATE.

Revision ID: 32411e67745b
Revises: 96b4a068408a
Create Date: 2024-01-05 14:59:20.825711

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '32411e67745b'
down_revision = '96b4a068408a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('word_state', schema=None) as batch_op:
        batch_op.add_column(sa.Column('available_at', sa.TIMESTAMP(), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('word_state', schema=None) as batch_op:
        batch_op.drop_column('available_at')

    # ### end Alembic commands ###
